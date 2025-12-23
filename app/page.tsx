"use client";

import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";

export interface InvoiceData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  noInvoice: string;
  userId: string;
  usePph: boolean;
  jenisItem: "paket" | "quota";
  paket: string;
  hargaPerUnit: number;
  durasi: string;
  penandatangan: {
    nama: string;
    jabatan: string;
  };
  statusPembayaran: "belum_bayar" | "sudah_bayar";
  tanggalPembayaran?: string;
}

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    namaPerusahaan: "",
    alamatPerusahaan: "",
    noInvoice: "",
    userId: "",
    usePph: true,
    jenisItem: "paket",
    paket: "DataPinter - Dasar Monthly",
    hargaPerUnit: 299000,
    durasi: "1 bulan",
    penandatangan: {
      nama: "Erlin Rodame Shinta",
      jabatan: "Head Marketing",
    },
    statusPembayaran: "belum_bayar",
    tanggalPembayaran: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50">
      <div className="bg-linear-to-r from-orange-50 via-orange-50 to-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo_black.png" className="w-36 md:w-44" />
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-orange-600 transition-all"
            >
              {showPreview ? "Edit Data" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className={`${showPreview ? 'hidden lg:block' : 'block'}`}>
            <InvoiceForm
              invoiceData={invoiceData}
              setInvoiceDataAction={setInvoiceData}
            />
          </div>

          {/* Preview Section */}
          <div className={`${!showPreview ? 'hidden lg:block' : 'block'}`}>
            <InvoicePreview invoiceData={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
}
