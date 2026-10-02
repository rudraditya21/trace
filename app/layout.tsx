import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ["latin"],
})

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Trace",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", dmSans.variable, bricolageGrotesque.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
