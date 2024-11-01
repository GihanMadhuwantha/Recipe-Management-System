// app/login/page.tsx
"use client"
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Login</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
