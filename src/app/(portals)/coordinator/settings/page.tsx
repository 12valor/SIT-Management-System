import React from "react";
import { Settings } from "lucide-react";
import { SettingsTabs } from "./SettingsTabs";

export default function SystemControlPage() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Settings className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">System Control</h2>
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed">
          High-level administrative terminal for the SIT Management System. Configure core operational 
          parameters and maintain institutional oversight across all platform nodes.
        </p>
      </div>

      {/* Generalized Tabbed Interface */}
      <SettingsTabs />
    </div>
  );
}
