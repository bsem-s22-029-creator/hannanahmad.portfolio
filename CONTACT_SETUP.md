# Contact Form Setup Instructions

## 📧 How to Receive Contact Form Messages

The contact form in your portfolio is currently set up with a mock email service. To receive actual messages from visitors, you need to integrate with a real email service. Here are the best options:

## 🚀 Recommended Solutions

### 1. **EmailJS (Easiest - No Backend Required)**
- **Cost**: Free tier available
- **Setup Time**: 5 minutes
- **Best for**: Quick setup, no backend needed

**Steps:**
1. Go to [EmailJS.com](https://www.emailjs.com/) and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
4. Get your Service ID, Template ID, and Public Key
5. Install EmailJS: `npm install @emailjs/browser`
6. Update `src/services/emailService.js` with your credentials

### 2. **Formspree (Simple Form Handler)**
- **Cost**: Free tier available
- **Setup Time**: 3 minutes
- **Best for**: Simple form handling

**Steps:**
1. Go to [Formspree.io](https://formspree.io/) and create an account
2. Create a new form and get the form ID
3. Replace `YOUR_FORM_ID` in the Formspree example code in `emailService.js`
4. Messages will be sent to your registered email

### 3. **Netlify Forms (If Deployed on Netlify)**
- **Cost**: Free tier available
- **Setup Time**: 2 minutes
- **Best for**: Sites hosted on Netlify

**Steps:**
1. Deploy your site to Netlify
2. Add `netlify` attribute to your form: `<form netlify>`
3. Add hidden input: `<input type='hidden' name='form-name' value='contact' />`
4. Netlify will automatically handle form submissions

## 🔧 Implementation

### For EmailJS:
```javascript
// In src/services/emailService.js
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData) => {
  try {
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',        // Replace with your service ID
      'YOUR_TEMPLATE_ID',       // Replace with your template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'your.email@example.com'
      },
      'YOUR_PUBLIC_KEY'         // Replace with your public key
    );
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Vite environment variables (recommended)

If you're using Vite, set these in your `.env` or `.env.production` files (do NOT commit secrets):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_EMAIL=your.email@example.com
```

The `src/services/emailService.js` will automatically use these values. If they are not set, the service falls back to a development mock.

### For Formspree:
```javascript
// In src/services/emailService.js
export const sendEmail = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

## 📱 Where to Check Messages

### EmailJS:
- Messages will be sent to your connected email account (Gmail, Outlook, etc.)
- Check your inbox for new messages

### Formspree:
- Log into your Formspree dashboard
- Go to "Submissions" to see all form submissions
- You can also set up email notifications

### Netlify:
- Log into your Netlify dashboard
- Go to "Forms" section to see all submissions
- You can also set up email notifications

## 🎯 Testing

1. Fill out the contact form on your portfolio
2. Submit the form
3. Check your email or dashboard for the message
4. Verify all form fields are captured correctly

## 🔒 Security Considerations

- **EmailJS**: Uses your email service's security
- **Formspree**: Built-in spam protection
- **Netlify**: Built-in spam protection and CAPTCHA support

## 💡 Pro Tips

1. **Set up email notifications** so you're immediately notified of new messages
2. **Add spam protection** if you expect high traffic
3. **Test thoroughly** before going live
4. **Keep backups** of important messages
5. **Consider adding a CAPTCHA** for additional security

## 🆘 Troubleshooting

### Common Issues:
- **Form not sending**: Check your API keys and service configuration
- **Messages not received**: Check spam folder and email settings
- **CORS errors**: Make sure you're using the correct API endpoints

### Need Help?
- Check the documentation for your chosen service
- Test with a simple form first
- Use browser developer tools to debug any errors

---

**Ready to go live?** Choose your preferred service and follow the setup instructions above. Your contact form will be fully functional in minutes! 🚀
