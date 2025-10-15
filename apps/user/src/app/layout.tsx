import type { Metadata } from "next";
import { Inter, Nunito, Urbanist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { PublicEnvScript } from "next-runtime-env";

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
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={`${nunito.variable} ${inter.style} ${urbanist.variable} antialiased`}
      >
        <QueryProvider>
          <div className="font-urbanist flex min-h-screen flex-col bg-black text-white">
            <Header />
            <main className="flex flex-1">{children}</main>
            <Toaster richColors position="top-center" />
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
