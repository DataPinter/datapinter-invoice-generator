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

// Register fonts from local files
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

// Register Arial font for company info
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
    paddingBottom: 80,
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
    marginTop: 8,
    marginBottom: 8,
  },
  invoiceTitle: {
    fontSize: 10,
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
    width: "60%",
    paddingRight: 16,
  },
  invoiceInfo: {
    width: "40%",
    textAlign: "left",
  },
  label: {
    fontSize: 10,
    width: "71%",
  },
  labelBold: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dateSection: {
    textAlign: "right",
    marginTop: 8,
    marginBottom: 2,
    fontSize: 10,
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
    minHeight: 28,
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 10,
    borderRightWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
  },
  tableCellNo: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 10,
    borderRightWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellLast: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBoldHeader: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: 10,
    fontWeight: "bold",
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBold: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 10,
    fontWeight: "bold",
    borderColor: "#000000",
    justifyContent: "center",
    textAlign: "center",
  },
  tableCellBoldLast: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 10,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  colNo: {
    width: "8%",
    textAlign: "center",
  },
  colItem: {
    width: "37%",
    textAlign: "left",
  },
  colHeadNo: {
    width: "8%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadItem: {
    width: "37%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadDuration: {
    width: "20%",
    textAlign: "center",
    fontWeight: "600",
  },
  colHeadPrice: {
    width: "17.5%",
    textAlign: "center",
    fontWeight: "600",
  },
  colDuration: {
    width: "20%",
    textAlign: "center",
  },
  colPrice: {
    width: "17.5%",
    textAlign: "center",
  },
  colTotal: {
    width: "17.5%",
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    borderColor: "#000000",
    justifyContent: "flex-end",
  },
  totalLabel: {
    width: "37.55%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000000",
  },
  totalValue: {
    width: "17.62%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  paymentInfo: {
    fontSize: 10,
    marginBottom: 4,
  },
  bankTable: {
    marginTop: 0,
    marginBottom: 0,
    gap: 4,
  },
  bankRow: {
    flexDirection: "row",
    marginBottom: 0,
  },
  bankLabel: {
    width: 128,
    fontSize: 10,
  },
  bankValue: {
    fontSize: 10,
    flex: 1,
  },
  termsTitle: {
    fontSize: 10,
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
    fontSize: 10,
    marginBottom: 0,
    lineHeight: 1.4,
  },
  signature: {
    marginTop: 24,
    position: "relative",
  },
  signatureLabel: {
    fontSize: 10,
    marginBottom: 0,
    position: "relative",
    zIndex: 10,
  },
  signatureImage: {
    width: 120,
    height: "auto",
    marginTop: -2,
    marginBottom: 0,
    marginLeft: 0,
  },
  signatureName: {
    fontSize: 10,
    textDecoration: "underline",
    marginTop: -8,
  },
  signatureTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
  signatureNameOnly: {
    fontSize: 10,
    textDecoration: "underline",
    marginTop: 64,
  },
});

interface InvoiceData {
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

interface InvoicePDFProps {
  invoiceData: InvoiceData;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoiceData }) => {
  const currentDate = format(new Date(), "dd MMMM yyyy", { locale: id });
  const currentYear = format(new Date(), "yyyy");

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
              {invoiceData.alamatPerusahaan || "[Alamat Perusahaan]"}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.labelBold}>
              No. Invoice :{" "}
              {invoiceData.noInvoice && invoiceData.userId
                ? `${invoiceData.noInvoice}/${invoiceData.userId}/SPP/${currentYear}`
                : "[No. Invoice]"}
            </Text>
          </View>
        </View>

        <Text style={styles.dateSection}>Tanggal: {currentDate}</Text>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellNo, styles.colHeadNo]}>No.</Text>
            <Text style={[styles.tableCell, styles.colHeadItem]}>Item</Text>
            <Text style={[styles.tableCell, styles.colHeadDuration]}>
              {invoiceData.jenisItem === "paket" ? "Durasi" : "Jumlah"}
            </Text>
            <Text style={[styles.tableCell, styles.colHeadPrice]}>
              Harga Per-unit
            </Text>
            <Text style={[styles.tableCellBoldLast, styles.colTotal]}>
              Total Jumlah
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCellNo, styles.colNo]}>1.</Text>
            <Text style={[styles.tableCell, styles.colItem]}>
              {invoiceData.paket || "DataPinter - Dasar Monthly"}
            </Text>
            <Text style={[styles.tableCell, styles.colDuration]}>
              {invoiceData.durasi}
            </Text>
            <Text style={[styles.tableCell, styles.colPrice]}>
              {formatCurrency(invoiceData.hargaPerUnit)}
            </Text>
            <Text style={[styles.tableCellLast, styles.colTotal]}>
              {formatCurrency(invoiceData.hargaPerUnit)}
            </Text>
          </View>

          {invoiceData.usePph && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCellNo, styles.colNo]}>2.</Text>
              <Text style={[styles.tableCell, styles.colItem]}>
                Tarif Potongan PPh 23 (2%)
              </Text>
              <Text style={[styles.tableCell, styles.colDuration]}>2%</Text>
              <Text style={[styles.tableCell, styles.colPrice]}>
                {formatCurrency(calculatePph(invoiceData.hargaPerUnit))}
              </Text>
              <Text style={[styles.tableCellLast, styles.colTotal]}>
                {formatCurrency(calculatePph(invoiceData.hargaPerUnit))}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(calculateTotal())}
            </Text>
          </View>
        </View>

        {/* Payment Info */}
        <Text style={styles.paymentInfo}>
          Pembayaran dapat dilakukan dalam Rupiah ke rekening berikut ini :
        </Text>

        <View style={styles.bankTable}>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Nama Rekening</Text>
            <Text style={styles.bankValue}>: PT SOLUSI PENJUAL PINTAR</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Bank</Text>
            <Text style={styles.bankValue}>: BCA</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>Alamat</Text>
            <Text style={styles.bankValue}>
              : KCU GADING SERPONG, Perumahan Gading Serpong,{"\n"}  Jl. Gading
              Serpong Boulevard No.001, Kabupaten Tangerang, 15810
            </Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>No. Rekening</Text>
            <Text style={styles.bankValue}>: 8832052000</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankLabel}>No. NPWP</Text>
            <Text style={styles.bankValue}>: 43449169241600</Text>
          </View>
        </View>

        <Text style={styles.termsTitle}>*Terms & conditions :</Text>
        {invoiceData.statusPembayaran === "belum_bayar" ? (
          <View style={styles.termsList}>
            <Text style={styles.termsItem}>
              - Penawaran ini berlaku 7 hari dari tanggal Invoice diterbitkan.
            </Text>
            <Text style={styles.termsItem}>
              - Datapinter terdaftar sebagai non PKP, maka tidak ada potongan
              PPn.
            </Text>
            <Text style={styles.termsItem}>
              - Seluruh pembayaran yang telah dilakukan tidak dapat
              dikembalikan.
            </Text>
          </View>
        ) : (
          <View style={styles.termsList}>
            <Text style={styles.termsItem}>
              - Pembayaran telah dilakukan pada{" "}
              {invoiceData.tanggalPembayaran
                ? format(new Date(invoiceData.tanggalPembayaran), "dd MMMM yyyy", {
                  locale: id,
                })
                : "[Tanggal Pembayaran]"}
            </Text>
          </View>
        )}

        <View style={styles.signature}>
          <Text style={styles.signatureLabel}>Hormat kami,</Text>
          {invoiceData.penandatangan.jabatan === "Head Marketing" ? (
            <View>
              <Image src="/e-signature.png" style={styles.signatureImage} />
              <Text style={styles.signatureName}>
                {invoiceData.penandatangan.nama}
              </Text>
              <Text style={styles.signatureTitle}>
                {invoiceData.penandatangan.jabatan}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.signatureNameOnly}>
                {invoiceData.penandatangan.nama}
              </Text>
              <Text style={styles.signatureTitle}>
                {invoiceData.penandatangan.jabatan}
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
