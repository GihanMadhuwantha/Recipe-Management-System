"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const isLogin = type === "login";
  const router = useRouter();
  const { status } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
          return;
        }

        router.push("/");
      } else {
        // Registration
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Registration failed");
        }


        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Error signing in after registration");
          return;
        }

        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-coral-500 flex items-center justify-center">
            cook
            <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1 rotate-45">
              <path fill="currentColor" d="M20 4v16H4V4h16m2-2H2v20h20V2z" />
            </svg>
          </h1>
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Email address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm text-gray-600">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-600">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm text-gray-600">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-pink-500 hover:text-pink-600"
          >
            {isLogin ? "Create an account" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};
