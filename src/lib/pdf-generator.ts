import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Add autotable property to jsPDF to satisfy TypeScript
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: unknown) => jsPDF;
  }
}

interface CertificateData {
  studentName: string;
  course: string;
  companyName: string;
  totalHours: number;
  grade: number;
  date: string;
  certificateId: string;
}

export const generateSITCertificate = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // 1. Premium Border
  doc.setDrawColor(79, 70, 229); // Indigo 600
  doc.setLineWidth(2);
  doc.rect(5, 5, width - 10, height - 10);
  
  doc.setDrawColor(15, 23, 42); // Slate 900
  doc.setLineWidth(0.5);
  doc.rect(7, 7, width - 14, height - 14);

  // 2. Corner Decorations
  doc.setFillColor(79, 70, 229);
  doc.triangle(5, 5, 25, 5, 5, 25, "F"); // Top Left
  doc.triangle(width - 5, 5, width - 25, 5, width - 5, 25, "F"); // Top Right
  doc.triangle(5, height - 5, 25, height - 5, 5, height - 25, "F"); // Bottom Left
  doc.triangle(width - 5, height - 5, width - 25, height - 5, width - 5, height - 25, "F"); // Bottom Right

  // 3. Header
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("SUPERVISED INDUSTRIAL TRAINING", width / 2, 40, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105); // Slate 500
  doc.text("OFFICIAL COMPLETION CERTIFICATE", width / 2, 50, { align: "center" });

  // 4. Main Body
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("This is to certify that", width / 2, 75, { align: "center" });

  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text(data.studentName.toUpperCase(), width / 2, 95, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Candidate ID: ${data.certificateId}`, width / 2, 105, { align: "center" });

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text("has successfully completed the assigned industrial protocols for", width / 2, 125, { align: "center" });

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(data.course, width / 2, 140, { align: "center" });

  // 5. Training Details
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.line(width / 4, 150, (3 * width) / 4, 150);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(79, 70, 229);
  doc.text("PARTNER INSTITUTION", width / 4, 165, { align: "center" });
  doc.text("VERIFIED HOURS", width / 2, 165, { align: "center" });
  doc.text("PERFORMANCE GRADE", (3 * width) / 4, 165, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, width / 4, 175, { align: "center" });
  doc.text(`${data.totalHours} Hours`, width / 2, 175, { align: "center" });
  doc.text(`${data.grade.toFixed(1)} / 5.0`, (3 * width) / 4, 175, { align: "center" });

  // 6. Signatures
  doc.line(40, 195, 100, 195);
  doc.line(width - 100, 195, width - 40, 195);

  doc.setFontSize(10);
  doc.text("OFFICE OF THE REGISTRAR", 70, 202, { align: "center" });
  doc.text("INDUSTRIAL SUPERVISOR", width - 70, 202, { align: "center" });

  // 7. Footer Meta
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`Issued on ${data.date} | SIT-OS Industrial Manifest v1.0`, width / 2, height - 15, { align: "center" });

  // 8. Save
  doc.save(`SIT_Certificate_${data.studentName.replace(/\s+/g, "_")}.pdf`);
};

export const generateCoordinatorReport = (title: string, data: string[][], columns: string[]) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("SIT SYSTEM INTELLIGENCE REPORT", 14, 22);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(title.toUpperCase(), 14, 30);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

  // Table
  doc.autoTable({
    startY: 45,
    head: [columns],
    body: data,
    theme: "striped",
    headStyles: { fillColor: [79, 70, 229], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 45 },
  });

  doc.save(`SIT_Report_${title.replace(/\s+/g, "_")}.pdf`);
};
