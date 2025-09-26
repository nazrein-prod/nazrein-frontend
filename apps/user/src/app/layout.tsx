import type { Metadata } from "next";
import { Inter, Nunito, Urbanist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nazrein - Nazar your youtube videos",
  description:
    "Track any youtube video for changes in their title and thumbnail",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${inter.style} ${urbanist.variable} antialiased`}
      >
        <QueryProvider>
          <div className="flex flex-col min-h-screen bg-black text-white font-urbanist">
            <Header />
            <main className="flex-1 flex">{children}</main>
            <Toaster richColors position="top-center" />
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
