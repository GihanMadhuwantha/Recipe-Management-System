"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/authContext"; 

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
