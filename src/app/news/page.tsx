import type { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
  title: "News & Announcements | SIT Management System",
  description: "Stay updated with the latest institutional bulletins, program updates, and official announcements from the TUPV SIT Strategic Office.",
};

export default function NewsPage() {
  return <NewsContent />;
}
