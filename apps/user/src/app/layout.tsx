import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import Header from "@/components/Header";
import { getServerSideUser } from "@/lib/user";
import AuthProvider from "@/providers/auth-provider";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "track.this - Track your YouTube videos",
  description:
    "Track any youtube video for changes in their title and thumbnail",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getServerSideUser();
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.style} antialiased`}>
        <QueryProvider>
          <AuthProvider initialUser={initialUser}>
            <div className="flex flex-col min-h-screen bg-white">
              <Header />
              <main className="flex-1 flex">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
