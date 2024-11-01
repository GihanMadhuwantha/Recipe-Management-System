import type { Metadata } from "next";
import "./globals.css";
// app/layout.tsx

import ClientLayout from "../app/clientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}



export const metadata: Metadata = {
  title: "recipe-app",
  description: "recipe-management-application",
};


