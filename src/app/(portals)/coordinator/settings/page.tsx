import React from "react";
import { Settings } from "lucide-react";
import { SettingsTabs } from "./SettingsTabs";

export default function SystemControlPage() {
  return (
    <div className="flex-1 space-y-12">
      {/* 1. Header Section */}
      <div className="pb-6 border-b border-border">
        <h2 className="text-2xl font-semibold text-foreground">
          System Control
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure platform settings and public assets.
        </p>
      </div>

      {/* Generalized Tabbed Interface */}
      <SettingsTabs />
    </div>
  );
}
