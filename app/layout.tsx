import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import "./components/Header.css";
import "./components/Footer.css";
import "./Home.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL("https://desacikalongpangandaran.id"),

  title: {
    default: "Website Resmi Desa Cikalong Kecamatan Sidamulih Kabupaten Pangandaran",
    template: "%s | Desa Cikalong",
  },

  description:
    "Website resmi Pemerintah Desa Cikalong, Kecamatan Sidamulih, Kabupaten Pangandaran, Jawa Barat. Informasi pemerintahan, pelayanan, berita, profil, dan kegiatan Desa Cikalong.",

  alternates: {
    canonical: "https://desacikalongpangandaran.id",
  },

  openGraph: {
    title:
      "Website Resmi Desa Cikalong Kecamatan Sidamulih Kabupaten Pangandaran",
    description:
      "Website resmi Pemerintah Desa Cikalong, Kecamatan Sidamulih, Kabupaten Pangandaran, Jawa Barat.",
    url: "https://desacikalongpangandaran.id",
    siteName: "Desa Cikalong",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}