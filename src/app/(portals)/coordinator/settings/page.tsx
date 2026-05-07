import React from "react";
import { Settings } from "lucide-react";
import { SettingsTabs } from "./SettingsTabs";

export default function SystemControlPage() {
  return (
    <div className="flex-1 space-y-12">
      {/* 1. Header Section */}
      <div className="pb-6 border-b border-border/50">
        <h2 className="text-xl font-semibold text-foreground">
          System Control
        </h2>
        <p className="text-sm text-foreground/80 mt-1">
          Administrative terminal for the SIT Management System
        </p>
      </div>

      {/* Generalized Tabbed Interface */}
      <SettingsTabs />
    </div>
  );
}
