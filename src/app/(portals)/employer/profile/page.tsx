import { Building2, CheckCircle2, Save } from "lucide-react";
import { getEmployerProfile, updateEmployerProfile } from "./actions";

export default async function EmployerProfilePage() {
  const company = await getEmployerProfile();

  if (!company) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <h1 className="text-xl font-bold">Company profile unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your account is not linked to a partner company.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Company Profile</h1>
            <p className="text-sm text-muted-foreground">Maintain the details shown across placement and student views.</p>
          </div>
        </div>
        {company.isVerified && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>

      <form action={updateEmployerProfile} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            Company Name
            <input name="name" defaultValue={company.name} required className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Industry
            <input name="industry" defaultValue={company.industry} required className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Location
            <input name="location" defaultValue={company.location || ""} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Available Slots
            <input name="slots" type="number" min={0} defaultValue={company.slots} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Logo URL
            <input name="logoUrl" defaultValue={company.logoUrl || ""} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Banner URL
            <input name="bannerUrl" defaultValue={company.bannerUrl || ""} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
        </div>

        <label className="block space-y-2 text-sm font-semibold">
          Company Description
          <textarea name="description" defaultValue={company.description || ""} rows={6} className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary" />
        </label>

        <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">
          <Save className="h-4 w-4" />
          Save Profile
        </button>
      </form>
    </div>
  );
}
