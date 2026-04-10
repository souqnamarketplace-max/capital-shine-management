import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { to, subject, body } = await req.json();

  if (!to || !subject || !body) {
    return Response.json({ error: 'Missing required fields: to, subject, body' }, { status: 400 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Capital Shine <onboarding@resend.dev>',
      to: [to],
      subject,
      html: body,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return Response.json({ error: data.message || 'Failed to send email' }, { status: res.status });
  }

  return Response.json({ success: true, id: data.id });
});