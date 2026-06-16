import { LockKeyhole, Save, Settings } from "lucide-react";
import { getEmployerSettings, updateEmployerSettings } from "./actions";

export default async function EmployerSettingsPage() {
  const settings = await getEmployerSettings();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Account Settings</h1>
          <p className="text-sm text-muted-foreground">Update supervisor identity and password controls.</p>
        </div>
      </div>

      <form action={updateEmployerSettings} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            Supervisor Name
            <input name="name" defaultValue={settings?.name || ""} required className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="space-y-2 text-sm font-semibold">
            Email Address
            <input value={settings?.email || ""} readOnly className="h-11 w-full rounded-lg border border-border bg-muted px-3 text-sm text-muted-foreground outline-none" />
          </label>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold">
            <LockKeyhole className="h-4 w-4 text-primary" />
            Password Update
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold">
              Current Password
              <input name="currentPassword" type="password" className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
            </label>
            <label className="space-y-2 text-sm font-semibold">
              New Password
              <input name="newPassword" type="password" minLength={8} className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
            </label>
          </div>
        </div>

        <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </form>
    </div>
  );
}
