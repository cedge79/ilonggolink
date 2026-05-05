import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWAProvider } from "./pwa-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "IlonggoLink",
  description: "Offline Ilonggo-English translator for your iPhone",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "IlonggoLink",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind = { config: { theme: { extend: { colors: { background: "#ffffff", foreground: "#0f172a", primary: "#2563eb", accent: "#16a34a", muted: "#f1f5f9", "muted-foreground": "#64748b" } } } } }
        ` }} />
        <script src="https://cdn.tailwindcss.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="IlonggoLink" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-sans antialiased overscroll-none">
        <PWAProvider />
        {children}
      </body>
    </html>
  );
}
