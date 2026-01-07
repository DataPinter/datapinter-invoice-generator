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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.ACCESS_PASSWORD || "resbal";

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password salah!");
      setPassword("");
    }
  };

  return (
    <>
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm shadow-xl">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <img src="/logo_black.png" className="w-32 mx-auto mb-4" alt="Logo" />
              <h2 className="text-base font-bold text-gray-800">
                Akses Terbatas
              </h2>
              <p className="text-gray-600">
                Masukkan password untuk mengakses halaman ini
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-500 text-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                    placeholder="Masukkan password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-orange-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-orange-600 transition-all"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 ${!isAuthenticated ? 'blur-xs pointer-events-none' : ''}`}>
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

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className={`${showPreview ? 'hidden lg:block' : 'block'}`}>
              <InvoiceForm
                invoiceData={invoiceData}
                setInvoiceDataAction={setInvoiceData}
              />
            </div>

            <div className={`${!showPreview ? 'hidden lg:block' : 'block'}`}>
              <InvoicePreview invoiceData={invoiceData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
