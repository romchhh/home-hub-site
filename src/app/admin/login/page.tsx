"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = await res.json();
      setError(data.message || "Invalid username or password");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#1a120c]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(232,210,186,0.18), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, rgba(60,36,18,0.9), transparent 50%), linear-gradient(160deg, #24180f 0%, #3c2412 45%, #1a120c 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8d2ba' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-5 py-12 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="max-w-md text-[#f5ebe0] lg:flex-1">
          <Image
            src="/logos/wordmark-dark.webp"
            alt="HOME HUB"
            width={220}
            height={76}
            className="mb-8 h-12 w-auto brightness-0 invert"
            priority
          />
          <p className="mb-3 text-xs tracking-[0.22em] text-[#e8d2ba]/uppercase">
            Admin console
          </p>
          <h1 className="mb-4 text-4xl leading-[1.15] font-semibold tracking-tight text-white md:text-5xl">
            Manage your showroom catalog
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-[#d8c4ae]/90">
            Products, categories, media and customer inquiries — one calm
            workspace for HOME HUB Stockholm.
          </p>
        </div>

        <div className="w-full max-w-md lg:flex-1">
          <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <h2 className="mb-1 text-2xl font-semibold text-gray-900">
              Sign in
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              Use your admin credentials to continue
            </p>

            {error ? (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#3c2412] focus:ring-4 focus:ring-[#3c2412]/10"
                  placeholder="admin"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-[#3c2412] focus:ring-4 focus:ring-[#3c2412]/10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-gray-800"
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#3c2412] px-4 py-3.5 text-sm font-semibold text-[#f5ebe0] transition hover:bg-[#2a180c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-[#cbb89a]/80">
            © {new Date().getFullYear()} HOME HUB · Protected area
          </p>
        </div>
      </div>
    </div>
  );
}
