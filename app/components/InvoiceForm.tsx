"use client";

import { InvoiceData } from "../page";

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  setInvoiceDataAction: (data: InvoiceData) => void;
}

export default function InvoiceForm({
  invoiceData,
  setInvoiceDataAction,
}: InvoiceFormProps) {
  const signatories = [
    { nama: "Marcel Christianis", jabatan: "Chief Technology Officer" },
    { nama: "Barron Li", jabatan: "Chief Marketing Officer" },
    { nama: "Erlin Rodame Shinta", jabatan: "Head Marketing" },
  ];

  const paketList = [
    { nama: "DataPinter - Dasar Monthly", harga: 299000, durasi: "1 bulan" },
    { nama: "DataPinter - Pinter Monthly", harga: 499000, durasi: "1 bulan" },
    { nama: "DataPinter - Jenius Monthly", harga: 2999000, durasi: "1 bulan" },
    { nama: "DataPinter - Enterprise Monthly", harga: 19000000, durasi: "1 bulan" },
    { nama: "DataPinter - Dasar Yearly", harga: 1790000, durasi: "1 tahun" },
    { nama: "DataPinter - Pinter Yearly", harga: 4990000, durasi: "1 tahun" },
    { nama: "DataPinter - Jenius Yearly", harga: 9990000, durasi: "1 tahun" },
    { nama: "DataPinter - Enterprise Yearly", harga: 190000000, durasi: "1 tahun" },
  ];

  // Generate quota download list: 10.000 - 1.000.000 produk
  const quotaList: Array<{ nama: string; harga: number; durasi: string }> = [];
  for (let i = 10000; i <= 1000000; i += 10000) {
    quotaList.push({
      nama: `DataPinter - Quota Download`,
      harga: (i / 10000) * 200000,
      durasi: `${i.toLocaleString("id-ID")} Produk`,
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setInvoiceDataAction({
      ...invoiceData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? parseFloat(value)
            : value,
    });
  };

  const handleSignatoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    setInvoiceDataAction({
      ...invoiceData,
      penandatangan: signatories[selectedIndex],
    });
  };

  const handlePaketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    const selectedPaket = paketList[selectedIndex];
    setInvoiceDataAction({
      ...invoiceData,
      paket: selectedPaket.nama,
      hargaPerUnit: selectedPaket.harga,
      durasi: selectedPaket.durasi,
    });
  };

  const handleQuotaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    const selectedQuota = quotaList[selectedIndex];
    setInvoiceDataAction({
      ...invoiceData,
      paket: selectedQuota.nama,
      hargaPerUnit: selectedQuota.harga,
      durasi: selectedQuota.durasi,
    });
  };

  const handleJenisItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jenisItem = e.target.value as "paket" | "quota";
    if (jenisItem === "paket") {
      const firstPaket = paketList[0];
      setInvoiceDataAction({
        ...invoiceData,
        jenisItem,
        paket: firstPaket.nama,
        hargaPerUnit: firstPaket.harga,
        durasi: firstPaket.durasi,
      });
    } else {
      const firstQuota = quotaList[0];
      setInvoiceDataAction({
        ...invoiceData,
        jenisItem,
        paket: firstQuota.nama,
        hargaPerUnit: firstQuota.harga,
        durasi: firstQuota.durasi,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 text-black border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Data Invoice
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Perusahaan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaPerusahaan"
            value={invoiceData.namaPerusahaan}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
            placeholder="PT. Solusi Penjual Pintar"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alamat Perusahaan <span className="text-red-500">*</span>
          </label>
          <textarea
            name="alamatPerusahaan"
            value={invoiceData.alamatPerusahaan}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm resize-none"
            placeholder="Jl. HR. Rasuna Said No. 38, Panguggugaan Utara, Pinang Kota Tangerang, Banten, 15810"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              No. Invoice <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noInvoice"
              value={invoiceData.noInvoice}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
              placeholder="INV-0001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userId"
              value={invoiceData.userId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
              placeholder="191912"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Jenis Item <span className="text-red-500">*</span>
          </label>
          <select
            name="jenisItem"
            value={invoiceData.jenisItem}
            onChange={handleJenisItemChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
          >
            <option value="paket">Paket Langganan</option>
            <option value="quota">Quota Download</option>
          </select>
        </div>

        {invoiceData.jenisItem === "paket" ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Paket <span className="text-red-500">*</span>
            </label>
            <select
              value={paketList.findIndex((p) => p.nama === invoiceData.paket)}
              onChange={handlePaketChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
            >
              {paketList.map((paket, index) => (
                <option key={index} value={index}>
                  {paket.nama} - Rp {paket.harga.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Quota Download <span className="text-red-500">*</span>
            </label>
            <select
              value={quotaList.findIndex((q) => q.nama === invoiceData.paket)}
              onChange={handleQuotaChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
            >
              {quotaList.map((quota, index) => (
                <option key={index} value={index}>
                  {quota.nama} - Rp {quota.harga.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Harga Per Unit <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                Rp
              </span>
              <input
                type="number"
                name="hargaPerUnit"
                value={invoiceData.hargaPerUnit}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                placeholder="299000"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {invoiceData.jenisItem === "paket" ? "Durasi" : "Jumlah"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="durasi"
              value={invoiceData.durasi}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-gray-50"
              placeholder={invoiceData.jenisItem === "paket" ? "1 bulan" : "10.000 Produk"}
              readOnly
            />
          </div>
        </div> */}

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status Pembayaran <span className="text-red-500">*</span>
          </label>
          <select
            name="statusPembayaran"
            value={invoiceData.statusPembayaran}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
          >
            <option value="belum_bayar">Belum Dibayar</option>
            <option value="sudah_bayar">Sudah Dibayar</option>
          </select>
        </div>

        {invoiceData.statusPembayaran === "sudah_bayar" && (
          <div className="pt-4 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tanggal Pembayaran <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalPembayaran"
              value={invoiceData.tanggalPembayaran}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Penandatangan <span className="text-red-500">*</span>
          </label>
          <select
            value={signatories.findIndex(
              (s) => s.nama === invoiceData.penandatangan.nama
            )}
            onChange={handleSignatoryChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm bg-white cursor-pointer"
          >
            {signatories.map((signatory, index) => (
              <option key={index} value={index}>
                {signatory.nama} - {signatory.jabatan}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="usePph"
                checked={invoiceData.usePph}
                onChange={handleChange}
                className="h-5 w-5 border-gray-300 rounded cursor-pointer accent-orange-600"
              />
            </div>
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                Gunakan Potongan PPh 23 (2%)
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Aktifkan jika invoice dikenakan pajak PPh 23
              </p>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
}
