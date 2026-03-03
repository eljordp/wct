import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO_EMAIL = process.env.RESEND_TO_EMAIL || 'ingrandefrankie@icloud.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { subject, html, replyTo } = req.body

    if (!subject || !html) {
      return res.status(400).json({ error: 'Missing subject or html' })
    }

    const { data, error } = await resend.emails.send({
      from: 'WCT Orders <onboarding@resend.dev>',
      to: TO_EMAIL,
      subject,
      html,
      replyTo: replyTo || undefined,
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to send email' })
  }
}
