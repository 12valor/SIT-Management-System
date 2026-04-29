import React from "react";
import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About the System | TUPV SIT Management System",
  description: "Learn about the mission, vision, and institutional heritage behind the TUPV Supervised Industrial Training platform.",
};

export default function AboutPage() {
  return <AboutContent />;
}
