import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(to: string, companyName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SIT Management System <notifications@resend.dev>",
      to: [to],
      subject: "INSTITUTIONAL NOTICE: Company Account Approved",
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 20px auto; padding: 40px; border: 1px solid #e2e8f0; background-color: #ffffff;">
          <div style="border-top: 4px solid #0f172a; margin-bottom: 30px;"></div>
          
          <h1 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
            Registration Approval Notice
          </h1>
          
          <p style="font-size: 15px; margin-top: 25px;">
            Attention: <strong>${companyName}</strong>
          </p>
          
          <p style="font-size: 15px; color: #334155;">
            This official communication confirms that your company profile has been reviewed and successfully verified by the SIT Coordination Office. Your organization is now authorized to participate in the Industrial Placement program.
          </p>
          
          <p style="font-size: 15px; color: #334155;">
            Authorized actions now available:
          </p>
          <ul style="font-size: 14px; color: #475569; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Publish industrial placement opportunities</li>
            <li style="margin-bottom: 8px;">Access student application registries</li>
            <li style="margin-bottom: 8px;">Manage company representative credentials</li>
          </ul>
          
          <div style="margin: 40px 0;">
            <a href="${process.env.NEXTAUTH_URL}/login" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">
              Access Institutional Portal
            </a>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 13px; color: #64748b; margin-bottom: 5px;">
              SIT Coordination Office
            </p>
            <p style="font-size: 12px; color: #94a3b8;">
              System Generated Notice | Please do not reply directly to this email.
            </p>
          </div>
          
          <p style="font-size: 11px; color: #cbd5e1; text-align: center; margin-top: 40px;">
            &copy; ${new Date().getFullYear()} SIT MANAGEMENT SYSTEM. ALL RIGHTS RESERVED.
          </p>
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
