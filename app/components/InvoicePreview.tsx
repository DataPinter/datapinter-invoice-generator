"use client";

import { InvoiceData } from "../page";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import { useState, useEffect } from "react";

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

export default function InvoicePreview({ invoiceData }: InvoicePreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Generate PDF blob and create URL for preview
    const generatePreview = async () => {
      setIsGenerating(true);
      try {
        const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();
        const url = URL.createObjectURL(blob);

        // Cleanup previous URL
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl);
        }

        setPdfUrl(url);
      } catch (error) {
        console.error("Error generating PDF preview:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generatePreview();

    // Cleanup on unmount
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [invoiceData]);

  const handleDownloadPDF = async () => {
    try {
      // Generate PDF document using react-pdf/renderer
      const blob = await pdf(<InvoicePDF invoiceData={invoiceData} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Generate filename
      const invoiceNo = invoiceData.noInvoice || "Draft";
      const companyName = invoiceData.namaPerusahaan || "Contoh Perusahaan";
      link.download = `_${invoiceNo} ${companyName}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
    }
  };

  return (
    <div className="space-y-4 text-black">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Preview Invoice</h3>
              <p className="text-xs text-gray-500">Preview PDF real-time</p>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg text-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100" style={{ height: "calc(100vh - 180px)" }}>
        {isGenerating ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
              <p className="text-gray-600">Generating PDF Preview...</p>
            </div>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Invoice PDF Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">No preview available</p>
          </div>
        )}
      </div>
    </div>
  );
}
