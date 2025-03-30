import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mono-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mocka",
  description: "An AI-Powered platform for preparing for mock interviews",
  icons: "/m.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern` }>
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
