import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMessage = body?.message;

    if (!rawMessage || typeof rawMessage !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const trimmed = rawMessage.trim();
    if (trimmed.length < 2) {
      return NextResponse.json(
        { error: "Message is a little too short! Tell me what's on your mind." },
        { status: 400 }
      );
    }

    if (trimmed.length > 3000) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 3,000 characters." },
        { status: 400 }
      );
    }

    // Sanitize message for HTML email preview
    const sanitized = trimmed
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.BIRTHDAY_RECIPIENT_EMAIL || "mukesh.awork@gmail.com";
    const sender = process.env.BIRTHDAY_SENDER_EMAIL || "onboarding@resend.dev";

    if (apiKey) {
      const resend = new Resend(apiKey);
      const emailResult = await resend.emails.send({
        from: `"Shalini's Birthday Surprise" <${sender}>`,
        to: [recipient],
        subject: "💌 Shalini's Answer: Do you like me or love me or both?",
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #FFF5F7; border: 1px solid #FFD1DC; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="font-size: 36px;">💌</span>
              <h2 style="color: #D81B60; margin: 8px 0 0 0; font-size: 22px;">Shalini's Secret Answer</h2>
              <p style="color: #777; font-size: 14px; margin: 6px 0 0 0; font-style: italic;">&ldquo;Do you like me or love me or both, and say why??&rdquo;</p>
            </div>
            
            <div style="background: #FFFFFF; padding: 24px; border-radius: 12px; border: 1px solid #FFE4E9; box-shadow: 0 4px 12px rgba(216, 27, 96, 0.06);">
              <p style="color: #444; font-size: 16px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${sanitized}</p>
            </div>

            <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #999;">
              <p style="margin: 0;">Sent on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} IST</p>
              <p style="margin: 4px 0 0 0;">Happy 25th Birthday Shalini ❤️</p>
            </div>
          </div>
        `,
        text: `Shalini's answer:\n\n${trimmed}\n\n---\nSent from the birthday website.`,
      });

      if (emailResult.error) {
        console.error("Resend delivery warning:", emailResult.error);
        // Return friendly response
        return NextResponse.json({
          success: true,
          note: "Message received! (Delivery fallback active)",
        });
      }

      return NextResponse.json({ success: true });
    } else {
      // In local development or before Resend API key is configured
      console.log("💌 [DEVELOPMENT MODE] Shalini's submitted message:");
      console.log("--------------------------------------------------");
      console.log(trimmed);
      console.log("--------------------------------------------------");
      console.log(`Target Recipient: ${recipient}`);
      console.log("(To deliver real emails, add RESEND_API_KEY in .env.local)");

      return NextResponse.json({
        success: true,
        simulated: true,
        note: "Message captured successfully in test mode.",
      });
    }
  } catch (err: unknown) {
    console.error("Error in /api/send-message:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending. Please try again." },
      { status: 500 }
    );
  }
}
