const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: [process.env.RECIPIENT_EMAIL],
      subject: 'Je t\'aime ❤',
      html: '<p>Joyeuse Saint-Valentin mon amour. Je t\'aime tellement. Tu es la plus belle chose qui me soit arrivée ❤</p>'
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};