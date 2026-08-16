/**
 * Contact form handler — a Cloudflare Pages Function.
 *
 * The form on /contact posts here as an ordinary HTML form. This validates the
 * message, drops obvious spam, hands it to Resend for delivery, and then sends
 * the visitor to a real page: /contact/thank-you or /contact/error.
 *
 * Because it is a plain POST and a plain redirect, the whole flow works with
 * JavaScript switched off, and the site ships no JavaScript for it.
 *
 * Set these in the Cloudflare dashboard under Settings → Environment variables:
 *   RESEND_API_KEY   your key from resend.com (starts with "re_")
 *   CONTACT_TO       the address messages are delivered to
 *   CONTACT_FROM     the address Resend sends as (optional)
 *
 * If RESEND_API_KEY is missing the visitor is sent to /contact/unavailable,
 * which hands them the email address directly — never a silent failure.
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type Context = {
  request: Request;
  env: Env;
};

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

/** Deliberately permissive: reject what is clearly not an address, nothing more. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const redirect = (request: Request, path: string, reason?: string): Response => {
  const url = new URL(path, new URL(request.url).origin);
  if (reason) url.searchParams.set('reason', reason);
  // 303 makes the browser follow up with a GET, so a refresh cannot resend.
  return Response.redirect(url.toString(), 303);
};

const field = (form: FormData, key: string, max: number): string => {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
};

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect(request, '/contact/error', 'invalid');
  }

  const name = field(form, 'name', MAX_NAME);
  const email = field(form, 'email', MAX_EMAIL);
  const message = field(form, 'message', MAX_MESSAGE);
  const honeypot = field(form, 'company', 100);

  // A filled honeypot means a bot. Answer as if it worked so it stops retrying,
  // and send nothing.
  if (honeypot !== '') {
    return redirect(request, '/contact/thank-you');
  }

  if (name === '' || message === '' || !EMAIL_PATTERN.test(email)) {
    return redirect(request, '/contact/error', 'invalid');
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO;

  if (!apiKey || !to) {
    // Not configured yet. Send the visitor to a page that hands them the email
    // address instead of a form that cannot work.
    return redirect(request, '/contact/unavailable');
  }

  const from = env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}\n`,
      }),
    });

    if (!response.ok) {
      console.error('Resend rejected the message', response.status, await response.text());
      return redirect(request, '/contact/error', 'send');
    }
  } catch (error) {
    console.error('Could not reach Resend', error);
    return redirect(request, '/contact/error', 'send');
  }

  return redirect(request, '/contact/thank-you');
};

/** A GET here is someone typing the URL — send them to the form. */
export const onRequestGet = ({ request }: Context): Response => redirect(request, '/contact');
