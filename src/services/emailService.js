// Email Service for Contact Form
// Supports EmailJS (client-side) when Vite env variables are provided.
import * as emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const sendEmail = async (formData) => {
  try {
    // If EmailJS is configured via env vars, use it
    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: import.meta.env.VITE_CONTACT_EMAIL || 'your.email@example.com'
        },
        PUBLIC_KEY
      )

      return { success: true, result }
    }

    // Fallback: simulate sending during development
    console.warn('EmailJS not configured — falling back to mock send')
    console.log('Email payload:', formData)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error.message }
  }
}

export const emailSetupInstructions = {
  emailjs: {
    title: 'EmailJS Setup',
    steps: [
      '1. Create an account at https://www.emailjs.com/',
      "2. Create a service and a template; add the template variables (from_name, from_email, subject, message)",
      "3. Add these env variables in your Vite .env file: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_CONTACT_EMAIL",
      "4. Install dependency: npm install @emailjs/browser",
      "5. Build and deploy — keep public key safe and don't embed private secrets in repo"
    ]
  },
  formspree: {
    title: 'Formspree Setup',
    steps: [
      '1. Create an account at https://formspree.io/',
      "2. Create a form and get the form ID",
      "3. Replace sendEmail implementation to POST to Formspree endpoint",
      "4. Configure notifications and dashboard in Formspree"
    ]
  }
}
