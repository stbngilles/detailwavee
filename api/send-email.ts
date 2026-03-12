import { BrevoClient } from '@getbrevo/brevo';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) {
    console.error('BREVO_API_KEY is missing');
    return response.status(500).json({ error: 'Configuration manquante : BREVO_API_KEY est introuvable sur le serveur.' });
  }

  const brevo = new BrevoClient({
    apiKey: apiKey
  });

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
      total,
      photos,
      items
    } = request.body;

    const attachments = (photos || []).map((photoDataUrl, index) => {
      const matches = photoDataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return null;
      }
      const type = matches[1];
      const base64Content = matches[2];
      const extension = type.split('/')[1] || 'jpg';

      return {
        name: `photo-${index + 1}.${extension}`,
        content: base64Content,
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

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle commande DETAILWAVE</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <div style="background-color: #1e3a8a; padding: 32px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">DETAILWAVE</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Nouvelle demande de rendez-vous</p>
          </div>
          <div style="padding: 32px;">
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">👤 Client</h2>
              <p style="margin: 8px 0; color: #4b5563;"><strong>${firstName} ${lastName}</strong></p>
              <p style="margin: 8px 0; color: #4b5563;">📞 <a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a></p>
              <p style="margin: 8px 0; color: #4b5563;">✉️ <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email || 'Non renseigné'}</a></p>
            </div>
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">📍 Adresse</h2>
              <p style="margin: 8px 0; color: #4b5563;">${address}</p>
              <p style="margin: 8px 0; color: #4b5563;">${postalCode} ${city}</p>
              ${note ? `<div style="background-color: #fffbeb; padding: 12px; border-radius: 8px; margin-top: 12px; color: #92400e; font-size: 14px; border: 1px solid #fcd34d;">📝 <strong>Note:</strong> ${note}</div>` : ''}
            </div>
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
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #111827; margin-bottom: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">🛒 Panier</h2>
              ${itemsHtml}
              <div style="margin-top: 20px; text-align: right; padding-top: 20px; border-top: 2px solid #f3f4f6;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #6b7280;">Total estimé</p>
                <p style="margin: 0; font-size: 28px; font-weight: bold; color: #2563EB;">${total}</p>
              </div>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">Cet e-mail a été généré automatiquement par le site DetailWave.</p>
            <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">
              <a href="https://detailwave.be" style="color: #2563EB; text-decoration: none;">detailwave.be</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 1. Send notification to OWNER
    const ownerEmailParams: any = {
      subject: `Nouvelle demande de rendez-vous - ${firstName} ${lastName}`,
      htmlContent: htmlContent,
      sender: { name: "DetailWave", email: process.env.BREVO_SENDER_EMAIL || "detailwave01@gmail.com" },
      to: [{ email: process.env.BREVO_RECIPIENT_EMAIL || "detailwave01@gmail.com" }],
      replyTo: { email: email || process.env.BREVO_RECIPIENT_EMAIL || "detailwave01@gmail.com" }
    };

    if (attachments.length > 0) {
      ownerEmailParams.attachment = attachments;
    }

    const ownerData = await brevo.transactionalEmails.sendTransacEmail(ownerEmailParams);

    // 2. Send confirmation to CUSTOMER
    if (email) {
      const customerEmailParams = {
        subject: "Confirmation de votre demande de rendez-vous - DetailWave",
        htmlContent: `
          <div style="font-family: sans-serif; color: #374151; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1f2937;">Bonjour ${firstName},</h2>
            <p>Nous avons bien reçu votre demande de rendez-vous et nous vous en remercions !</p>
            <p>Nous allons l'analyser et nous reviendrons vers vous très prochainement.</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h3 style="margin-top: 0; font-size: 16px;">Résumé de votre demande :</h3>
              <p style="margin: 5px 0;"><strong>Date souhaitée :</strong> ${preferredDate}</p>
              <p style="margin: 5px 0;"><strong>Heure souhaitée :</strong> ${preferredTime}</p>
            </div>

            <p>À très bientôt,<br>L'équipe DetailWave</p>
          </div>
        `,
        sender: { name: "DetailWave", email: process.env.BREVO_SENDER_EMAIL || "detailwave01@gmail.com" },
        to: [{ email: email }],
      };
      await brevo.transactionalEmails.sendTransacEmail(customerEmailParams);
    }

    return response.status(200).json(ownerData);
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Extract more detail from Brevo error if available
    let errorMessage = error.message;
    if (error.response && error.response.body && error.response.body.message) {
      errorMessage = `Brevo Error: ${error.response.body.message}`;
    } else if (error.body && error.body.message) {
      errorMessage = `Brevo Error: ${error.body.message}`;
    }
    
    return response.status(500).json({ error: errorMessage });
  }
}
