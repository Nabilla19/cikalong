import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./components/Header.css";
import "./components/Footer.css";
import "./Home.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website Resmi Desa Cikalong",
  description: "Portal informasi resmi, layanan publik, dan potensi lokal Desa Cikalong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.className}>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
