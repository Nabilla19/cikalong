import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import "./components/Header.css";
import "./components/Footer.css";
import "./Home.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Website Desa Cikalong",
  description: "Website resmi Desa Cikalong, Kecamatan Sidamulih, Kabupaten Pangandaran",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
