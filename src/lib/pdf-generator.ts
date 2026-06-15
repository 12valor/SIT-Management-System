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
  logoBase64?: string;
}

export const generateSITCertificate = (data: CertificateData) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth(); // 297
  const height = doc.internal.pageSize.getHeight(); // 210

  const primaryRed = { r: 128, g: 0, b: 0 }; // TUP Maroon
  const goldAccent = { r: 218, g: 165, b: 32 };

  // 1. Backgrounds
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, "F");

  // Left Side Red Column
  const sideWidth = 75;
  doc.setFillColor(primaryRed.r, primaryRed.g, primaryRed.b);
  doc.rect(0, 0, sideWidth, height, "F");

  // Gold Accent Line
  doc.setFillColor(goldAccent.r, goldAccent.g, goldAccent.b);
  doc.rect(sideWidth, 0, 3, height, "F");

  // Logo
  if (data.logoBase64) {
    // 40x40 logo centered in the 75mm wide column -> x = (75-40)/2 = 17.5
    doc.addImage(data.logoBase64, "PNG", 17.5, 20, 40, 40);
  }

  // Text on the red column
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("TECHNOLOGICAL", sideWidth / 2, 80, { align: "center" });
  doc.text("UNIVERSITY OF", sideWidth / 2, 88, { align: "center" });
  doc.text("THE PHILIPPINES", sideWidth / 2, 96, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(220, 220, 220);
  doc.text("Ayala Blvd, Ermita", sideWidth / 2, 115, { align: "center" });
  doc.text("Manila, 1000 Metro Manila", sideWidth / 2, 120, { align: "center" });

  // Right Side Content Area
  const contentXCenter = sideWidth + 3 + (width - sideWidth - 3) / 2; // ~187.5

  // 3. Header
  doc.setTextColor(primaryRed.r, primaryRed.g, primaryRed.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("SUPERVISED INDUSTRIAL TRAINING", contentXCenter, 40, { align: "center" });
  
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0); 
  doc.text("CERTIFICATE OF COMPLETION", contentXCenter, 50, { align: "center" });

  // 4. Main Body
  doc.setFontSize(14);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(50, 50, 50);
  doc.text("This is to proudly certify that", contentXCenter, 75, { align: "center" });

  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryRed.r, primaryRed.g, primaryRed.b);
  doc.text(data.studentName.toUpperCase(), contentXCenter, 95, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Candidate ID: ${data.certificateId}`, contentXCenter, 105, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text("has successfully fulfilled the prescribed hours and industrial protocols for", contentXCenter, 125, { align: "center" });

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(data.course, contentXCenter, 138, { align: "center" });

  // 5. Training Details
  doc.setDrawColor(200, 200, 200); 
  doc.line(sideWidth + 20, 150, width - 20, 150);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryRed.r, primaryRed.g, primaryRed.b);
  
  // Three columns within the right section
  const col1 = sideWidth + 3 + (width - sideWidth - 3) * 0.25; // ~133
  const col2 = sideWidth + 3 + (width - sideWidth - 3) * 0.5;  // ~187.5
  const col3 = sideWidth + 3 + (width - sideWidth - 3) * 0.75; // ~242

  doc.text("PARTNER INSTITUTION", col1, 160, { align: "center" });
  doc.text("VERIFIED HOURS", col2, 160, { align: "center" });
  doc.text("PERFORMANCE GRADE", col3, 160, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, col1, 168, { align: "center", maxWidth: 50 });
  doc.text(`${data.totalHours} Hours`, col2, 168, { align: "center" });
  doc.text(`${data.grade.toFixed(1)} / 5.0`, col3, 168, { align: "center" });

  // 6. Signatures
  doc.setDrawColor(0, 0, 0);
  doc.line(col1 - 25, 195, col1 + 25, 195);
  doc.line(col3 - 25, 195, col3 + 25, 195);

  doc.setFontSize(10);
  doc.text("OFFICE OF THE REGISTRAR", col1, 202, { align: "center" });
  doc.text("INDUSTRIAL SUPERVISOR", col3, 202, { align: "center" });

  // 7. Footer Meta
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150); 
  doc.text(`Issued on ${data.date} | Official SIT Manifest`, col2, height - 8, { align: "center" });

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
    headStyles: { fillColor: [128, 0, 0], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 45 },
  });

  doc.save(`SIT_Report_${title.replace(/\s+/g, "_")}.pdf`);
};

export const generateResourceDocument = (title: string, description: string, logoBase64?: string) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth();
  
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", width / 2 - 15, 20, 30, 30);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(128, 0, 0); // TUP Maroon
  
  // Title might be long, handle wrapping
  const splitTitle = doc.splitTextToSize(title.toUpperCase(), width - 40);
  doc.text(splitTitle, width / 2, 65, { align: "center" });

  const titleHeight = splitTitle.length * 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  
  const splitDesc = doc.splitTextToSize(description, width - 40);
  doc.text(splitDesc, 20, 65 + titleHeight + 10);

  doc.setDrawColor(200, 200, 200);
  doc.line(20, 65 + titleHeight + 10 + (splitDesc.length * 6) + 10, width - 20, 65 + titleHeight + 10 + (splitDesc.length * 6) + 10);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("This document is generated by the SIT Management System.", 20, 65 + titleHeight + 10 + (splitDesc.length * 6) + 20);
  doc.text("Technological University of the Philippines - Visayas", 20, 65 + titleHeight + 10 + (splitDesc.length * 6) + 25);

  doc.save(`${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
};
