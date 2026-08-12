import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";
import { getLocale } from "@/db/queries";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#6366F1",
};

export const metadata: Metadata = siteConfig;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <ClerkProvider
      appearance={{
        options: {
          logoImageUrl: "/favicon.ico",
        },
        variables: {
          colorPrimary: "#6366F1",
        },
      }}
      telemetry={false}
      afterSignOutUrl="/"
    >
      <html lang={locale}>
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton />
          <ExitModal locale={locale} />
          <HeartsModal locale={locale} />
          <PracticeModal locale={locale} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
