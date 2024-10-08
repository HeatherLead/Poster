import type { Metadata } from "next";
import { Poppins, Jost } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Taskbar from "./Taskbar";
import Footer from "./Footer";
import AuthProvider from "./auth/Provider";
const jost = Jost({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Poster",
  description: "E-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AuthProvider>
          <Theme radius="small">
            <Taskbar />
            {children}
            <hr />
            <Footer />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
