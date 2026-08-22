import { Resend } from 'resend';

// Create and export a shared Resend client instance.
// Reads API key from process.env.RESEND_API_KEY (do NOT commit secrets).
export const resend = new Resend(process.env.RESEND_API_KEY);
