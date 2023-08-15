const nodemailer = require('nodemailer')

class MailerService {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationCode (email, activationCode) {
    try {
      this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Your Twinki confirmation code: ${activationCode}`,
        text: '',
        html:
          `
                    <div>
                          <h1>Activation Code</h1>
                          <p>Dear user,</p>
                          <p>Your activation code is:</p>
                          <h2><strong>${activationCode}</strong></h2>
                          <p>Please enter this code to activate your account.</p>
                          <p>If you didn't request this activation code, you can ignore this email.</p>
                          <p>Best regards,</p>
                          <p>Twinki</p>
                    </div>
                `
      })
    } catch (error) {
      console.error('Error sending activation code email:', error)
      throw new Error('Failed to send activation code email')
    }
  }
}

module.exports = MailerService
