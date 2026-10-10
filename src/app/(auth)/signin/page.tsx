"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import {
  Envelope,
  Eye,
  EyeSlash,
  Lock,
} from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [callbackURL, setCallbackURL] = useState("/");

  const [emailLoading, setEmailLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [githubLoading, setGithubLoading] =
    useState(false);

  // =====================================================
  // GET CALLBACK URL FROM BROWSER
  // =====================================================

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const requestedURL =
      params.get("callbackURL");

    // Prevent unsafe external redirects
    if (
      requestedURL &&
      requestedURL.startsWith("/") &&
      !requestedURL.startsWith("//")
    ) {
      setCallbackURL(requestedURL);
    }
  }, []);

  // =====================================================
  // EMAIL / PASSWORD LOGIN
  // =====================================================

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const password = String(
      formData.get("password") ?? "",
    );

    const remember =
      formData.get("remember") === "on";

    try {
      setEmailLoading(true);

      const { data, error } =
        await signIn.email({
          email,
          password,
          rememberMe: remember,
          callbackURL,
        });

      if (error) {
        toast.error(
          error.message ??
            "Sign in failed. Please try again.",
        );

        return;
      }

      if (data) {
        toast.success(
          `Hello! ${data.user?.name ?? ""}`,
          {
            icon: "👏",
          },
        );

        form.reset();

        // Return user to previous protected page
        window.location.assign(callbackURL);
      }
    } catch (error) {
      console.error(
        "Email login error:",
        error,
      );

      toast.error(
        "Something went wrong. Please try again.",
      );
    } finally {
      setEmailLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async () => {
    const toastId = toast.loading(
      "Connecting to Google...",
    );

    try {
      setGoogleLoading(true);

      const { error } =
        await signIn.social({
          provider: "google",
          callbackURL,
        });

      if (error) {
        toast.error(
          error.message ??
            "Google sign in failed",
          {
            id: toastId,
          },
        );

        setGoogleLoading(false);

        return;
      }

      toast.success(
        "Redirecting to Google...",
        {
          id: toastId,
        },
      );
    } catch (error) {
      console.error(
        "Google login error:",
        error,
      );

      toast.error(
        "Google sign in failed",
        {
          id: toastId,
        },
      );

      setGoogleLoading(false);
    }
  };

  // =====================================================
  // GITHUB LOGIN
  // =====================================================

  const handleGithubLogin = async () => {
    const toastId = toast.loading(
      "Connecting to GitHub...",
    );

    try {
      setGithubLoading(true);

      const { error } =
        await signIn.social({
          provider: "github",
          callbackURL,
        });

      if (error) {
        toast.error(
          error.message ??
            "GitHub sign in failed",
          {
            id: toastId,
          },
        );

        setGithubLoading(false);

        return;
      }

      toast.success(
        "Redirecting to GitHub...",
        {
          id: toastId,
        },
      );
    } catch (error) {
      console.error(
        "GitHub login error:",
        error,
      );

      toast.error(
        "GitHub sign in failed",
        {
          id: toastId,
        },
      );

      setGithubLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-10">
      <div className="container mx-auto">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50 lg:grid-cols-2">
          {/* ================= LEFT SIDE ================= */}

          <div className="relative hidden overflow-hidden bg-emerald-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Decorations */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/30" />

            <div className="relative z-10">
              {/* Logo */}

              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                  🛒
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    বাজার দর
                  </h2>

                  <p className="text-sm text-emerald-100">
                    প্রতিদিনের বাজার, এক জায়গায়
                  </p>
                </div>
              </Link>

              {/* Content */}

              <div className="mt-20">
                <p className="text-sm font-medium text-emerald-100">
                  আবার স্বাগতম
                </p>

                <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">
                  আপনার বাজারের তথ্য এখন আরও
                  সহজ
                </h1>

                <p className="mt-5 max-w-md leading-7 text-emerald-100">
                  আপনার অ্যাকাউন্টে সাইন ইন করে
                  প্রতিদিনের বাজারদর, পণ্যের
                  দামের পরিবর্তন এবং বিভিন্ন
                  বাজারের তথ্য দেখুন।
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-16 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-emerald-50">
                চাল, ডাল, তেল, সবজি, মাছ ও
                মাংসসহ প্রয়োজনীয় পণ্যের সর্বশেষ
                বাজারদর এক জায়গায়।
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="p-6 sm:p-10 lg:p-12">
            {/* Mobile Logo */}

            <Link
              href="/"
              className="mb-8 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
                🛒
              </div>

              <span className="text-xl font-bold text-gray-900">
                বাজার দর
              </span>
            </Link>

            {/* Heading */}

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                সাইন ইন করুন
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                আপনার অ্যাকাউন্টে প্রবেশ করতে
                তথ্য দিন।
              </p>
            </div>

            {/* ================= SOCIAL LOGIN ================= */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {/* Google */}

              <Button
                type="button"
                variant="secondary"
                onPress={handleGoogleLogin}
                isDisabled={googleLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <GoogleIcon />

                {googleLoading
                  ? "Connecting..."
                  : "Google"}
              </Button>

              {/* GitHub */}

              <Button
                type="button"
                variant="secondary"
                onPress={handleGithubLogin}
                isDisabled={githubLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                <GithubIcon />

                {githubLoading
                  ? "Connecting..."
                  : "GitHub"}
              </Button>
            </div>

            {/* ================= DIVIDER ================= */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-400">
                অথবা ইমেইল দিয়ে
              </span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ================= EMAIL FORM ================= */}

            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >
              {/* Email */}

              <TextField
                isRequired
                name="email"
                type="email"
                aria-label="ইমেইল"
                validate={(value) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      value,
                    )
                  ) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                  }

                  return null;
                }}
              >
                <Label className="font-medium text-gray-700">
                  ইমেইল
                </Label>

                <div className="relative">
                  <Envelope className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="example@email.com"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Password */}

              <TextField
                isRequired
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                aria-label="পাসওয়ার্ড"
              >
                <div className="flex items-center justify-between">
                  <Label className="font-medium text-gray-700">
                    পাসওয়ার্ড
                  </Label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="আপনার পাসওয়ার্ড"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev,
                      )
                    }
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition hover:text-emerald-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Remember */}

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 accent-emerald-600"
                />

                আমাকে মনে রাখুন
              </label>

              {/* Login */}

              <Button
                type="submit"
                isDisabled={emailLoading}
                className="mt-1 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {emailLoading
                  ? "সাইন ইন হচ্ছে..."
                  : "সাইন ইন করুন"}
              </Button>
            </Form>

            {/* Signup */}

            <p className="mt-7 text-center text-sm text-gray-500">
              অ্যাকাউন্ট নেই?{" "}

              <Link
                href="/signup"
                className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
              >
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= GOOGLE ICON ================= */

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"
      />

      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.63-2.4l-3.24-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.05v2.59A10 10 0 0 0 12 22Z"
      />

      <path
        fill="#FBBC05"
        d="M6.4 13.93A6 6 0 0 1 6.08 12c0-.67.11-1.32.32-1.93V7.48H3.05A10 10 0 0 0 2 12c0 1.61.39 3.14 1.05 4.52l3.35-2.59Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.65 9.65 0 0 0 12 2 10 10 0 0 0 3.05 7.48l3.35 2.59c.79-2.37 3-4.13 5.6-4.13Z"
      />
    </svg>
  );
}

/* ================= GITHUB ICON ================= */

function GithubIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.03c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.99 0 0 .95-.3 3.11 1.16A10.8 10.8 0 0 1 12 6.2c.96 0 1.93.13 2.84.38 2.16-1.46 3.1-1.16 3.1-1.16.62 1.56.23 2.71.12 2.99.72.79 1.15 1.8 1.15 3.03 0 4.34-2.64 5.29-5.15 5.57.4.35.76 1.04.76 2.1v3.08c0 .3.2.65.77.54A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}