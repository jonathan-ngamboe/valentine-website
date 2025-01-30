const { Resend } = require("resend");
require("dotenv").config();

  if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}
if (!process.env.SENDER_EMAIL) {
  throw new Error("SENDER_EMAIL is not defined");
}
if (!process.env.RECIPIENT_EMAIL) {
  throw new Error("RECIPIENT_EMAIL is not defined");
}

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: [process.env.RECIPIENT_EMAIL],
      subject: "Je t'aime ❤",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #e91e63; text-align: center;">❤ Message spécial pour toi ❤</h2>
                    <p style="font-size: 16px; line-height: 1.5; text-align: center;">
                        Joyeuse Saint-Valentin mon amour.<br>
                        Je t'aime tellement.<br>
                        Tu es la plus belle chose qui me soit arrivée ❤
                    </p>
                </div>
            `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    console.error("Email sending error:", error);

    res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
};
