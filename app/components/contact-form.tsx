'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Send } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'fallback';

const statusMessage: Record<Status, string> = {
  idle: '',
  sending: 'Sending your message...',
  sent: 'Message sent successfully. I will get back to you soon.',
  error: 'Message could not be sent. Please try again in a moment.',
  fallback: 'EmailJS is not configured. Opened your default email client instead.',
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const mailto = `mailto:ch.tahaarif2005@gmail.com?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${name || 'Website Visitor'}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

      window.location.href = mailto;
      setStatus('fallback');
      form.reset();
      return;
    }

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            message,
            to_name: 'Muhammad Taha',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('EmailJS request failed');
      }

      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-label="Contact form">
      <div>
        <label htmlFor="name" className="field-label">
          Name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className="input-field" />
      </div>

      <div>
        <label htmlFor="email" className="field-label">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className="input-field" />
      </div>

      <div>
        <label htmlFor="message" className="field-label">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className="input-field resize-none" />
      </div>

      <button type="submit" className="cta-primary w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Sending...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Send size={16} /> Send Message
          </span>
        )}
      </button>

      <p className="text-sm text-slate-300/80 min-h-6" aria-live="polite">
        {statusMessage[status]}
      </p>
    </form>
  );
}
