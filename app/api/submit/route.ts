import { NextRequest } from "next/server";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";

// Initialize Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // If using a service account JSON, use:
    // credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
  });
}
const db = admin.firestore();

// Setup email transport
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (email: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Faleminderit që ndatë historinë tuaj!",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Poppins', sans-serif;
            }
          </style>
        </head>
        <body>
          <p><strong>I/e nderuar,</strong></p>
          <p>Faleminderit për kohën dhe gatishmërinë për të ndarë historinë tuaj. Ajo tashmë është ruajtur dhe do të bëhet pjesë e një narrative që do të jetojë, duke siguruar që kujtimet dhe përvojat që ndatë të mos harrohen kurrë.</p>
          <br>
          <p>Me respekt,</p>
          <p>Arita Dreshaj</p>
          <p><a href="https://www.aritadreshaj.com/">www.aritadreshaj.com</a></p>
        </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export async function POST(req: Request) {
  try {
    // Accept JSON body with file URLs and form fields
    const data = await req.json();
    let {
      emri,
      ditelindja,
      vendlindja,
      vendbanimiAktual,
      email,
      rrëfim,
      mbartje,
      images = [],
      videos = [],
      audio = null
    } = data;

    // Compose a safe folder name based on vendlindja and emri
    const safe = (str: string) => (str || "anon").toLowerCase().replace(/[^a-z0-9]/gi, "_");
    const folderName = `${safe(vendlindja)}-${safe(emri)}`;

    // Compose text content for storage/email
    let textContent =
      `emri: ${emri}\n` +
      `ditelindja: ${ditelindja}\n` +
      `vendlindja: ${vendlindja}\n` +
      `vendbanimiAktual: ${vendbanimiAktual}\n` +
      `email: ${email}\n` +
      `rrëfim: ${rrëfim}\n` +
      `mbartje: ${mbartje}\n`;

    // Store metadata in Firestore with custom document name
    await db.collection("submissions").doc(folderName).set({
      emri,
      ditelindja,
      vendlindja,
      vendbanimiAktual,
      email,
      rrëfim,
      mbartje,
      images,
      videos,
      audio,
      submissionDate: new Date(),
    });

    if (email) {
      await sendConfirmationEmail(email);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error handling form submission:", error);
    return new Response(JSON.stringify({ error: error?.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
