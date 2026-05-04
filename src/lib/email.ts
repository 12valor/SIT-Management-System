import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(to: string, companyName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SIT Management System <notifications@resend.dev>", // Replace with verified domain in production
      to: [to],
      subject: "Company Account Approved - SIT Management System",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #0f172a; margin-top: 0; font-size: 24px;">Registration Approved</h1>
          <p>Hello <strong>${companyName}</strong>,</p>
          <p>We are pleased to inform you that your company account has been successfully verified and approved by the SIT Coordinator.</p>
          <p>You can now log in to your dashboard to post industrial placement opportunities and manage your student applications.</p>
          <div style="margin: 30px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" style="background-color: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 500; display: inline-block;">Login to Dashboard</a>
          </div>
          <p style="font-size: 14px; color: #64748b;">If you have any questions, please contact the SIT Coordination Office.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">&copy; ${new Date().getFullYear()} SIT Management System. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Failed to send approval email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
}
