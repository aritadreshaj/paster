const nodemailer = require("nodemailer");

// Use only the correct Zoho EU SMTP host
const host = "smtppro.zoho.eu";

const transporter = nodemailer.createTransport({
  host,
  port: 465,
  secure: true,
  auth: {
    user: "info@aritadreshaj.com",
    pass: "your_zoho_app_password",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error: Error | null, success: boolean) {
  if (error) {
    console.log(`[${host}] SMTP Login Failed:`, error.message);
  } else {
    console.log(`[${host}] SMTP Server is ready to take messages`);
  }
});
