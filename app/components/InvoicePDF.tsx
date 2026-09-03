import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

Font.register({
  family: "Calibri",
  fonts: [
    {
      src: "/calibri.ttf",
    },
    {
      src: "/calibri-bold.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "/arial.ttf",
    },
    {
      src: "/arial-bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 56,
    paddingHorizontal: 56,
    fontSize: 10,
    fontFamily: "Calibri",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 176,
    marginBottom: 24,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    fontFamily: "Arial",
  },
  companyName: {
    fontWeight: "bold",
    color: "#111827",
    fontFamily: "Arial",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#9ca3af",
    marginTop: 2,
    marginBottom: 4,
  },
  invoiceBody: {
    fontFamily: "Times-Roman",
  },
  invoiceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  clientInfo: {
    width: "52%",
    paddingRight: 16,
  },
  invoiceInfo: {
    width: "48%",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 12,
    width: "71%",
    lineHeight: 1.5,
  },
  labelBold: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  invoiceNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "right",
  },
  dateSection: {
    textAlign: "right",
    marginTop: 8,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
  table: {
    marginTop: 0,
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
  },
  tableRow: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000000",
    minHeight: 22,
  },
  tableCell: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontSize: 12,
    borderRightWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
  },
  tableCellNo: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRightWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellLast: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBoldHeader: {
    paddingVertical: 4,
    paddingHorizontal: 0,
    fontSize: 12,
    fontWeight: "bold",
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBold: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: "bold",
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBoldLast: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  colNo: {
    width: "8%",
    textAlign: "center",
  },
  colItem: {
    width: "34%",
    textAlign: "left",
  },
  colItemQuota: {
    width: "32%",
  },
  colHeadNo: {
    width: "8%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadItem: {
    width: "34%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadItemQuota: {
    width: "32%",
  },
  colHeadDuration: {
    width: "16%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadDurationQuota: {
    width: "20%",
  },
  colHeadPrice: {
    width: "22%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadPriceQuota: {
    width: "20%",
  },
  colDuration: {
    width: "16%",
    textAlign: "center",
  },
  colDurationQuota: {
    width: "20%",
  },
  colPrice: {
    width: "22%",
    textAlign: "center",
  },
  colPriceQuota: {
    width: "20%",
  },
  colTotal: {
    width: "20%",
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    width: "100%",
    borderColor: "#000000",
  },
  totalLabel: {
    width: "42%",
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  totalLabelQuota: {
    width: "40%",
  },
  totalValue: {
    width: "58%",
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  totalValueQuota: {
    width: "60%",
  },
  paymentInfo: {
    fontSize: 12,
    marginBottom: 8,
  },
  bankTable: {
    marginTop: 0,
    marginBottom: 20,
    gap: 6,
  },
  bankRow: {
    flexDirection: "row",
    marginBottom: 0,
  },
  bankLabel: {
    width: 120,
    fontSize: 12,
  },
  bankValue: {
    fontSize: 12,
    flex: 1,
  },
  bankAddressValue: {
    fontSize: 12,
    flex: 1,
    lineHeight: 1.5,
  },
  publisherName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  billedSection: {
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
  },
  billedTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  billedName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 12,
  },
  billedEmail: {
    color: "#075f73",
    textDecoration: "underline",
  },
  termsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 0,
  },
  termsList: {
    marginLeft: 16,
    marginTop: 4,
    gap: 4,
  },
  termsItem: {
    fontSize: 12,
    marginBottom: 0,
    lineHeight: 1.4,
  },
  signature: {
    marginTop: 24,
    position: "relative",
  },
  signatureLabel: {
    fontSize: 12,
    marginBottom: 0,
    position: "relative",
    zIndex: 10,
  },
  signatureImage: {
    width: 120,
    height: "auto",
    marginTop: -32,
    marginBottom: 0,
    marginRight: 12,
    marginLeft: 0,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  signatureTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
  },
  signatureNameOnly: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 64,
  },
});

interface InvoiceData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  noInvoice: string;
  tanggalInvoice?: string;
  userId: string;
  usePph: boolean;
  jenisItem: "paket" | "quota";
  paket: string;
  hargaPerUnit: number;
  durasi: string;
  penandatangan: {
    nama: string;
  };
  statusPembayaran: "belum_bayar" | "sudah_bayar";
  tanggalPembayaran?: string;
  emailPenagihan?: string;
  showPaymentDateInStatus?: boolean;
}

interface InvoicePDFProps {
  invoiceData: InvoiceData;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
};

const formatInvoiceDate = (date?: string): string => {
  if (!date) {
    return format(new Date(), "d MMMM yyyy", { locale: id });
  }

  const [year, month, day] = date.split("-").map(Number);
  return format(new Date(year, month - 1, day), "d MMMM yyyy", {
    locale: id,
  });
};

const formatDuration = (duration: string): string => {
  return duration.replace(/\b(bulan|tahun)\b/g, (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
};

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoiceData }) => {
  const invoiceDate = formatInvoiceDate(invoiceData.tanggalInvoice);
  const currentYear = invoiceData.tanggalInvoice
    ? invoiceData.tanggalInvoice.slice(0, 4)
    : format(new Date(), "yyyy");

  const calculatePph = (amount: number) => {
    return amount * 0.02;
  };

  const calculateTotal = () => {
    const harga = invoiceData.hargaPerUnit;
    if (invoiceData.usePph) {
      const pph = calculatePph(harga);
      return harga - pph;
    }
    return harga;
  };

  const paymentStatusLabel =
    invoiceData.statusPembayaran === "sudah_bayar" ? "PAID" : "UNPAID";
  const paymentStatusText =
    invoiceData.showPaymentDateInStatus && invoiceData.tanggalPembayaran
      ? `${paymentStatusLabel} - ${formatInvoiceDate(invoiceData.tanggalPembayaran)}`
      : paymentStatusLabel;
  const isQuotaItem = invoiceData.jenisItem === "quota";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/logo_black.png" style={styles.logo} />
        <View>
          <Text style={[styles.companyInfo, styles.companyName]}>
            PT. SOLUSI PENJUAL PINTAR
          </Text>
          <Text style={styles.companyInfo}>
            Jl. HR. Rasuna Said No. 38, Panguggugaan Utara, Pinang
          </Text>
          <Text style={styles.companyInfo}>
            Kota Tangerang, Banten, 15810
          </Text>
          <Text style={styles.companyInfo}>Telephone +62 881 686 6088</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.invoiceBody}>
          {/* Invoice Title */}
          <Text style={styles.invoiceTitle}>INVOICE</Text>

          {/* Client and Invoice Info */}
          <View style={styles.headerSection}>
            <View style={styles.clientInfo}>
              <Text style={styles.label}>
                <Text style={styles.labelBold}>Kepada Yth. :</Text>
              </Text>
              <Text style={styles.labelBold}>
                {invoiceData.namaPerusahaan || "[Nama Perusahaan]"}
              </Text>
              <Text style={styles.label}>
                {invoiceData.alamatPerusahaan || "[Alamat atau PIC Perusahaan]"}
              </Text>
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceNumber} wrap={false}>
                No. Invoice :{" "}
                {invoiceData.noInvoice && invoiceData.userId
                  ? `${invoiceData.noInvoice}/${invoiceData.userId}/SPP/${currentYear}`
                  : "[No. Invoice]"}
              </Text>
            </View>
          </View>

          <Text style={styles.dateSection}>Tanggal: {invoiceDate}</Text>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCellNo, styles.colHeadNo]}>No.</Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colHeadItem,
                  isQuotaItem ? styles.colHeadItemQuota : {},
                ]}
                wrap={false}
              >
                Item
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colHeadDuration,
                  isQuotaItem ? styles.colHeadDurationQuota : {},
                ]}
                wrap={false}
              >
                Jumlah
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colHeadPrice,
                  isQuotaItem ? styles.colHeadPriceQuota : {},
                ]}
                wrap={false}
              >
                Harga Per-Unit
              </Text>
              <Text style={[styles.tableCellBoldLast, styles.colTotal]} wrap={false}>
                Total Jumlah
              </Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableCellNo, styles.colNo]}>1.</Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colItem,
                  isQuotaItem ? styles.colItemQuota : {},
                ]}
                wrap={false}
              >
                {invoiceData.paket || "DataPinter - Dasar Monthly"}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colDuration,
                  isQuotaItem ? styles.colDurationQuota : {},
                ]}
                wrap={false}
              >
                {formatDuration(invoiceData.durasi)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.colPrice,
                  isQuotaItem ? styles.colPriceQuota : {},
                ]}
                wrap={false}
              >
                {formatCurrency(invoiceData.hargaPerUnit)}
              </Text>
              <Text style={[styles.tableCellLast, styles.colTotal]} wrap={false}>
                {formatCurrency(invoiceData.hargaPerUnit)}
              </Text>
            </View>

            {invoiceData.usePph && (
              <View style={styles.tableRow}>
                <Text style={[styles.tableCellNo, styles.colNo]}>2.</Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colItem,
                    isQuotaItem ? styles.colItemQuota : {},
                  ]}
                >
                  Tarif Potongan PPh 23 (2%)
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colDuration,
                    isQuotaItem ? styles.colDurationQuota : {},
                  ]}
                  wrap={false}
                >
                  2%
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colPrice,
                    isQuotaItem ? styles.colPriceQuota : {},
                  ]}
                  wrap={false}
                >
                  {formatCurrency(calculatePph(invoiceData.hargaPerUnit))}
                </Text>
                <Text style={[styles.tableCellLast, styles.colTotal]} wrap={false}>
                  {formatCurrency(calculatePph(invoiceData.hargaPerUnit))}
                </Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text
                style={[
                  styles.totalLabel,
                  isQuotaItem ? styles.totalLabelQuota : {},
                ]}
              >
                Jumlah Pembayaran
              </Text>
              <Text
                style={[
                  styles.totalValue,
                  isQuotaItem ? styles.totalValueQuota : {},
                ]}
                wrap={false}
              >
                {formatCurrency(calculateTotal())}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text
                style={[
                  styles.totalLabel,
                  isQuotaItem ? styles.totalLabelQuota : {},
                ]}
              >
                Status Pembayaran
              </Text>
              <Text
                style={[
                  styles.totalValue,
                  isQuotaItem ? styles.totalValueQuota : {},
                ]}
                wrap={false}
              >
                {paymentStatusText}
              </Text>
            </View>
          </View>

          {/* Publisher Info */}
          <Text style={styles.paymentInfo}>Diterbitkan Oleh,</Text>
          <Text style={styles.publisherName}>PT SOLUSI PENJUAL PINTAR</Text>

          <View style={styles.bankTable}>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>Alamat</Text>
              <Text style={styles.bankAddressValue}>
                : KCU GADING SERPONG, Perumahan Gading Serpong,{"\n"}  Jl.
                Gading Serpong Boulevard No.001, Kabupaten Tangerang, 15810
              </Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>No. Rekening BCA</Text>
              <Text style={styles.bankValue}>: 8832052000</Text>
            </View>
            <View style={styles.bankRow}>
              <Text style={styles.bankLabel}>No. NPWP</Text>
              <Text style={styles.bankValue}>: 43449169241600</Text>
            </View>
          </View>

          {invoiceData.statusPembayaran === "sudah_bayar" && (
            <View style={styles.billedSection}>
              <Text style={styles.billedTitle}>Ditagihkan oleh,</Text>
              <Text style={styles.billedName}>
                {invoiceData.namaPerusahaan || "[Nama Perusahaan]"}
              </Text>
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>Email</Text>
                <Text style={styles.bankValue}>
                  :{" "}
                  <Text style={styles.billedEmail}>
                    {invoiceData.emailPenagihan || "[Email Penagihan]"}
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {invoiceData.statusPembayaran === "belum_bayar" && (
            <View>
              <Text style={styles.termsTitle}>*Terms & conditions :</Text>
              <View style={styles.termsList}>
                <Text style={styles.termsItem}>
                  - Penawaran ini berlaku 7 hari dari tanggal Invoice
                  diterbitkan.
                </Text>
                <Text style={styles.termsItem}>
                  - Datapinter terdaftar sebagai non PKP, maka tidak ada
                  potongan PPn.
                </Text>
                <Text style={styles.termsItem}>
                  - Seluruh pembayaran yang telah dilakukan tidak dapat
                  dikembalikan.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.signature}>
            <Text style={styles.signatureLabel}>Hormat kami,</Text>
            {invoiceData.penandatangan.nama === "Barron Konstantin" ? (
              <View>
                <Image src="/e-signature-new.png" style={styles.signatureImage} />
                <Text style={styles.signatureName}>
                  {invoiceData.penandatangan.nama}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.signatureNameOnly}>
                  {invoiceData.penandatangan.nama}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
