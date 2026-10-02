import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const preferencesScript = `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

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
      suppressHydrationWarning
      className={cn("h-full", "antialiased", dmSans.variable, bricolageGrotesque.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
