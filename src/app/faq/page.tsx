import React from "react";
import { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | TUPV SIT Management System",
  description: "Find answers to common questions about the Supervised Industrial Training platform, registration, and logbook verification.",
};

export default function FAQPage() {
  return <FAQContent />;
}
