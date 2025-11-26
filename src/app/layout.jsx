import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nerd Club - Research Community",
  description: "Created by Species",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <HeroHeader />
          {children}
          <FooterSection></FooterSection>

        </AuthProvider>

      </body>
    </html>
  );
}
