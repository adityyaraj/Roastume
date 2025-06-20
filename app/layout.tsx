import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Navbar from "@/components/navbar";
import { Pointer } from "@/components/magicui/pointer";

export const metadata: Metadata = {
  title: "Roastumé",
  description: "Get brutally honest feedback on your resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Pointer className="fill-purple-500"/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
