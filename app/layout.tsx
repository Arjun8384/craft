import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Craft",
  description: "Tool Lending Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}