import prisma from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ActivatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  let success = false;
  let message = "";

  if (!token) {
    message = "Verification token is missing.";
  } else {
    try {
      const verificationToken = await prisma.verificationToken.findUnique({
        where: { token },
      });

      if (!verificationToken) {
        message = "Activation link is invalid or has already been used.";
      } else if (new Date() > verificationToken.expires) {
        message = "Activation link has expired.";
        await prisma.verificationToken.delete({
          where: { token },
        }).catch(() => {});
      } else {
        await prisma.user.update({
          where: { email: verificationToken.identifier },
          data: { isApproved: true },
        });

        await prisma.verificationToken.delete({
          where: { token },
        });

        success = true;
        message = "Your student account has been activated successfully.";
      }
    } catch (error) {
      console.error("Activation error:", error);
      message = "An error occurred during account activation. Please try again later.";
    }
  }

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-background pt-32 pb-24 px-6 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-10 rounded-2xl shadow-sm text-center">
        <header className="mb-8">
          <span className="text-primary font-medium tracking-widest uppercase text-xs mb-3 block">
            Security Verification
          </span>
          <h1 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-2">
            Account Activation
          </h1>
        </header>

        <div className="flex flex-col items-center justify-center space-y-6">
          {success ? (
            <>
              <CheckCircle2 className="h-16 w-16 text-emerald-500" />
              <p className="text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                {message}
              </p>
              <Link
                href="/login/student"
                className="w-full flex items-center justify-center h-12 bg-primary text-white font-medium rounded-xl hover:bg-primary/95 transition-colors font-serif shadow-lg shadow-primary/20"
              >
                Access Student Portal
              </Link>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="text-slate-600 dark:text-slate-300 font-serif leading-relaxed">
                {message}
              </p>
              <Link
                href="/signup/student"
                className="w-full flex items-center justify-center h-12 bg-slate-900 dark:bg-white/10 text-white font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white/20 transition-colors font-serif"
              >
                Return to Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
