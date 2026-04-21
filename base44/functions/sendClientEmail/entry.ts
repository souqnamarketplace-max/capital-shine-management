import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@2.5.1';

async function generatePdfBase64(doc) {
  const pdfArrayBuffer = doc.output('arraybuffer');
  const bytes = new Uint8Array(pdfArrayBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function buildPdf(data) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const margin = 50;
  let y = 50;

  // Header
  doc.setFontSize(22).setFont(undefined, 'bold').setTextColor(13, 43, 94);
  doc.text(data.docType, W - margin, y, { align: 'right' });
  doc.setFontSize(10).setFont(undefined, 'normal').setTextColor(120, 120, 120);
  doc.text(data.docNumber || '', W - margin, y + 18, { align: 'right' });

  // Company info
  doc.setTextColor(30, 30, 30).setFontSize(11).setFont(undefined, 'bold');
  doc.text('Capital Shine Cleaning Inc.', margin, y);
  doc.setFont(undefined, 'normal').setTextColor(120, 120, 120).setFontSize(9);
  doc.text('Edmonton, AB', margin, y + 14);

  y += 55;

  // Client + Date block
  doc.setTextColor(30, 30, 30).setFontSize(9).setFont(undefined, 'bold');
  doc.text(data.leftLabel || 'Bill To', margin, y);
  doc.setFont(undefined, 'normal').setFontSize(10).setTextColor(30, 30, 30);
  doc.text(data.clientName || '', margin, y + 14);
  doc.setFontSize(9).setTextColor(120, 120, 120);
  if (data.clientEmail) doc.text(data.clientEmail, margin, y + 26);
  if (data.clientAddress) doc.text(data.clientAddress, margin, y + 38);

  doc.setTextColor(30, 30, 30).setFontSize(9).setFont(undefined, 'bold');
  doc.text('Date', W - margin - 80, y, { align: 'left' });
  doc.setFont(undefined, 'normal').setFontSize(10);
  doc.text(data.date || '', W - margin - 80, y + 14);
  if (data.secondaryDateLabel && data.secondaryDate) {
    doc.setFontSize(9).setFont(undefined, 'bold').setTextColor(30, 30, 30);
    doc.text(data.secondaryDateLabel, W - margin - 80, y + 30);
    doc.setFont(undefined, 'normal').setFontSize(10);
    doc.text(data.secondaryDate, W - margin - 80, y + 44);
  }

  // Extra badge (e.g. PAID · Cash)
  if (data.badge) {
    doc.setFillColor(232, 245, 233);
    doc.roundedRect(W - margin - 110, y + 55, 110, 20, 4, 4, 'F');
    doc.setTextColor(46, 125, 50).setFontSize(9).setFont(undefined, 'bold');
    doc.text(data.badge, W - margin - 55, y + 68, { align: 'center' });
  }

  y += 80;

  // Table header
  const colX = [margin, margin + 210, margin + 270, margin + 350, margin + 430];
  doc.setFillColor(13, 43, 94);
  doc.rect(margin, y, W - margin * 2, 22, 'F');
  doc.setTextColor(255, 255, 255).setFontSize(9).setFont(undefined, 'bold');
  doc.text('Description', colX[0] + 4, y + 14);
  doc.text('Qty', colX[1], y + 14, { align: 'center' });
  doc.text('Unit Price', colX[2] + 40, y + 14, { align: 'right' });
  doc.text('Amount', colX[3] + 40, y + 14, { align: 'right' });
  y += 22;

  // Table rows
  doc.setFont(undefined, 'normal').setTextColor(30, 30, 30).setFontSize(9);
  (data.items || []).forEach((item, i) => {
    const bg = i % 2 === 0 ? [250, 250, 252] : [255, 255, 255];
    doc.setFillColor(...bg);
    doc.rect(margin, y, W - margin * 2, 20, 'F');
    doc.setTextColor(30, 30, 30);
    doc.text(String(item.description || ''), colX[0] + 4, y + 13);
    doc.text(String(item.quantity || ''), colX[1], y + 13, { align: 'center' });
    doc.text(`$${Number(item.unitPrice || 0).toFixed(2)}`, colX[2] + 40, y + 13, { align: 'right' });
    doc.text(`$${(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}`, colX[3] + 40, y + 13, { align: 'right' });
    y += 20;
  });

  y += 14;

  // Totals
  const totalsX = W - margin - 160;
  doc.setTextColor(100, 100, 100).setFontSize(9);
  doc.text('Subtotal', totalsX, y); doc.text(`$${Number(data.subtotal || 0).toFixed(2)}`, W - margin, y, { align: 'right' }); y += 16;
  doc.text(`Tax (${data.taxRate || 0}%)`, totalsX, y); doc.text(`$${Number(data.taxAmount || 0).toFixed(2)}`, W - margin, y, { align: 'right' }); y += 4;
  doc.setDrawColor(13, 43, 94).line(totalsX, y, W - margin, y); y += 10;
  doc.setFont(undefined, 'bold').setFontSize(11).setTextColor(13, 43, 94);
  doc.text(data.totalLabel || 'Total', totalsX, y); doc.text(`$${Number(data.total || 0).toFixed(2)}`, W - margin, y, { align: 'right' });

  if (data.notes) {
    y += 30;
    doc.setFont(undefined, 'bold').setFontSize(9).setTextColor(30, 30, 30);
    doc.text('Notes:', margin, y);
    doc.setFont(undefined, 'normal').setTextColor(80, 80, 80);
    doc.text(data.notes, margin + 40, y);
  }

  // Footer
  doc.setFontSize(8).setTextColor(160, 160, 160).setFont(undefined, 'normal');
  doc.text('Capital Shine Cleaning Inc. — Edmonton, Alberta, Canada', W / 2, doc.internal.pageSize.getHeight() - 30, { align: 'center' });

  return doc;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, subject, attachmentData, attachmentFilename } = await req.json();

  if (!to || !subject) {
    return Response.json({ error: 'Missing required fields: to, subject' }, { status: 400 });
  }

  // Fetch sender email from SiteSettings
  const settings = await base44.asServiceRole.entities.SiteSettings.list();
  const senderEmail = settings[0]?.email;
  const companyName = settings[0]?.companyName || 'Capital Shine';
  const phone = settings[0]?.phone || '';

  if (!senderEmail) {
    return Response.json({ error: 'No sender email configured in Site Settings' }, { status: 400 });
  }

  // Build a clean, simple email body
  const docType = attachmentData?.docType || 'Document';
  const docNumber = attachmentData?.docNumber || '';
  const clientName = attachmentData?.clientName || '';
  const total = attachmentData?.total ? `$${Number(attachmentData.total).toFixed(2)}` : '';

  let greeting = '';
  if (docType === 'INVOICE') {
    greeting = `Please find your invoice ${docNumber} attached to this email. The total amount due is ${total}.`;
  } else if (docType === 'RECEIPT') {
    greeting = `Thank you for your payment! Please find your receipt ${docNumber} attached to this email. Total paid: ${total}.`;
  } else if (docType === 'QUOTE') {
    greeting = `Please find your quote ${docNumber} attached to this email. The quoted total is ${total}.`;
  } else {
    greeting = `Please find your document attached to this email.`;
  }

  const emailBody = `
    <div style="font-family: Arial, sans-serif; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <img src="https://media.base44.com/images/public/69d868764ae72015a390f9a7/a6358c68e_ChatGPTImageApr10202610_30_41AM.png" style="height: 70px; width: auto; margin-bottom: 30px;" alt="${companyName}" />
      <p style="font-size: 16px; color: #333;">Hi ${clientName},</p>
      <p style="font-size: 15px; color: #555; line-height: 1.6;">${greeting}</p>
      <p style="font-size: 15px; color: #555; line-height: 1.6;">If you have any questions, feel free to reply to this email or give us a call.</p>
      <p style="font-size: 15px; color: #333; margin-top: 30px;">Best regards,<br/><strong>${companyName}</strong>${phone ? `<br/>${phone}` : ''}<br/>${senderEmail}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 11px; color: #aaa;">This email was sent from ${companyName}. Edmonton, Alberta, Canada.</p>
    </div>
  `;

  const payload = {
    from: `${companyName} <${senderEmail}>`,
    to: [to],
    subject,
    html: emailBody,
  };

  // Generate and attach real PDF
  if (attachmentData && attachmentFilename) {
    const doc = buildPdf(attachmentData);
    const base64Content = await generatePdfBase64(doc);
    payload.attachments = [{
      filename: attachmentFilename,
      content: base64Content,
    }];
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.message || data.name || 'Failed to send email' }, { status: 400 });
  }

  return Response.json({ success: true, id: data.id });
});