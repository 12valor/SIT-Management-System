import React from "react";
import { Metadata } from "next";
import ResourcesContent from "./ResourcesContent";

export const metadata: Metadata = {
  title: "Institutional Resources | TUPV SIT Management System",
  description: "Access the archival repository of SIT manuals, MOU templates, and technical guidelines for trainees and partners.",
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
