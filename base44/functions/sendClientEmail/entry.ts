import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { to, subject, body, attachmentHtml, attachmentFilename } = await req.json();

  if (!to || !subject || !body) {
    return Response.json({ error: 'Missing required fields: to, subject, body' }, { status: 400 });
  }

  // Fetch sender email from SiteSettings
  const settings = await base44.asServiceRole.entities.SiteSettings.list();
  const senderEmail = settings[0]?.email;
  const companyName = settings[0]?.companyName || 'Capital Shine';

  if (!senderEmail) {
    return Response.json({ error: 'No sender email configured in Site Settings' }, { status: 400 });
  }

  const payload = {
    from: `${companyName} <${senderEmail}>`,
    to: [to],
    subject,
    html: body,
  };

  // Attach PDF as base64-encoded HTML file if provided
  if (attachmentHtml && attachmentFilename) {
    const base64Content = btoa(unescape(encodeURIComponent(attachmentHtml)));
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