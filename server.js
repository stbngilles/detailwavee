
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

// Initialize Resend with the key
const resend = new Resend(process.env.RESEND_API_KEY || 're_HaZqQwM4_D6RyVkQdJBELiQTWuZLRu2vM');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/send-email', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      postalCode,
      city,
      note,
      preferredDate,
      preferredTime,
      items, // Receive the items array
      total,
      photos
    } = req.body;

    console.log(`Received order from ${firstName} ${lastName}`);

    // Process attachments
    const attachments = (photos || []).map((photoDataUrl, index) => {
      const matches = photoDataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) return null;

      const type = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const extension = type.split('/')[1] || 'jpg';

      return {
        filename: `photo-${index + 1}.${extension}`,
        content: buffer,
      };
    }).filter(Boolean);

    // Generate Items HTML
    const itemsHtml = (items || []).map(item => `
      <div style="display: flex; align-items: center; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 12px;">
        <div style="flex: 1;">
          <h4 style="margin: 0; font-size: 16px; color: #1f2937;">${item.name}</h4>
          ${item.selectedOption ? `<p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">${item.selectedOption.label}</p>` : ''}
        </div>
        <div style="font-weight: bold; color: #1f2937;">
          ${item.selectedOption ? item.selectedOption.price : item.price}€
        </div>
      </div>
    `).join('');

    // HTML Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle commande DETAILWAVE</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          
          <!-- Header -->
          <div style="background-color: #1e3a8a; padding: 32px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">DETAILWAVE</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Nouvelle demande de rendez-vous</p>
          </div>

          <!-- Content -->
          <div style="padding: 32px;">
            
            <!-- Customer Info -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">👤 Client</h2>
              <p style="margin: 8px 0; color: #4b5563;"><strong>${firstName} ${lastName}</strong></p>
              <p style="margin: 8px 0; color: #4b5563;">📞 <a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a></p>
              <p style="margin: 8px 0; color: #4b5563;">✉️ <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email || 'Non renseigné'}</a></p>
            </div>

            <!-- Address -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📍 Adresse</h2>
              <p style="margin: 8px 0; color: #4b5563;">${address}</p>
              <p style="margin: 8px 0; color: #4b5563;">${postalCode} ${city}</p>
              ${note ? `<div style="background-color: #fffbeb; padding: 12px; border-radius: 8px; margin-top: 12px; color: #92400e; font-size: 14px; border: 1px solid #fcd34d;">📝 <strong>Note:</strong> ${note}</div>` : ''}
            </div>

            <!-- Appointment -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📅 Rendez-vous souhaité</h2>
              <div style="display: flex; gap: 20px;">
                <div style="background-color: #f9fafb; padding: 12px; border-radius: 8px; flex: 1; text-align: center; border: 1px solid #e5e7eb;">
                  <span style="display: block; font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Date</span>
                  <strong style="color: #111827; font-size: 16px;">${preferredDate || 'À définir'}</strong>
                </div>
                <div style="background-color: #f9fafb; padding: 12px; border-radius: 8px; flex: 1; text-align: center; border: 1px solid #e5e7eb;">
                  <span style="display: block; font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Heure</span>
                  <strong style="color: #111827; font-size: 16px;">${preferredTime || 'À définir'}</strong>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🛒 Panier</h2>
              ${itemsHtml}
              <div style="margin-top: 20px; text-align: right; padding-top: 20px; border-top: 2px solid #f3f4f6;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #6b7280;">Total estimé</p>
                <p style="margin: 0; font-size: 28px; font-weight: bold; color: #2563EB;">${total}</p>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">Cet e-mail a été généré automatiquement par le site DetailWave.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'pixelbrute.studio@gmail.com',
      replyTo: email,
      subject: `Nouvelle demande de rendez-vous - ${firstName} ${lastName}`,
      html: htmlContent,
      attachments: attachments
    });

    console.log('Email sent successfully:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
