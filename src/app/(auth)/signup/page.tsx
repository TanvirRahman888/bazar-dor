"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import {
  Check,
  Envelope,
  Eye,
  EyeSlash,
  Lock,
  Person,
  PersonWorker,
} from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    const image = String(formData.get("image") ?? "").trim();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const { data, error } = await signUp.email({
      name,
      email,
      password,
      image: image || undefined,

      callbackURL: "/",
    });

    if (error) {
      toast.error(`Sign up error : ${error.message}`);

      return;
    }

    if (data.token) {
      toast.success(`Sign up successful.`);
      toast(`Hello ! ${data?.user?.name}`, {
        icon: "👏",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f8f4] px-4 py-10">
      <div className="container mx-auto">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50 lg:grid-cols-2">
          {/* Left Section */}
          <div className="relative hidden overflow-hidden bg-emerald-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Decorations */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/30" />

            <div className="relative z-10">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur">
                  🛒
                </div>

                <div>
                  <h2 className="text-2xl font-bold">বাজার দর</h2>

                  <p className="text-sm text-emerald-100">
                    প্রতিদিনের বাজার, এক জায়গায়
                  </p>
                </div>
              </Link>

              <div className="mt-20">
                <p className="text-sm font-medium text-emerald-100">
                  আপনার অ্যাকাউন্ট তৈরি করুন
                </p>

                <h1 className="mt-3 max-w-md text-4xl font-bold leading-tight">
                  প্রতিদিনের বাজারদর আরও সহজে দেখুন
                </h1>

                <p className="mt-5 max-w-md leading-7 text-emerald-100">
                  বাজারের সর্বশেষ দাম, দামের পরিবর্তন এবং বিভিন্ন বাজারের
                  তুলনামূলক তথ্য এক জায়গায় দেখুন।
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-16 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-emerald-50">
                চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ প্রয়োজনীয় পণ্যের প্রতিদিনের
                বাজারদর সহজেই জানতে পারবেন।
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-10 lg:p-12">
            {/* Mobile Brand */}
            <Link href="/" className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white">
                🛒
              </div>

              <span className="text-xl font-bold text-gray-900">বাজার দর</span>
            </Link>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                অ্যাকাউন্ট তৈরি করুন
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                শুরু করতে নিচের তথ্যগুলো পূরণ করুন।
              </p>
            </div>

            <Form
              className="mt-8 flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >
              {/* Full Name */}
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.trim().length < 2) {
                    return "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
                  }

                  return null;
                }}
              >
                <Label className="font-medium text-gray-700">পূর্ণ নাম</Label>

                <div className="relative">
                  <Person className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="আপনার পূর্ণ নাম"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                  }

                  return null;
                }}
              >
                <Label className="font-medium text-gray-700">ইমেইল</Label>

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
                minLength={8}
                type={showPassword ? "text" : "password"}
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "কমপক্ষে একটি সংখ্যা থাকতে হবে";
                  }

                  return null;
                }}
              >
                <Label className="font-medium text-gray-700">পাসওয়ার্ড</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="পাসওয়ার্ড লিখুন"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition hover:text-emerald-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <Description className="text-xs text-gray-400">
                  কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা
                </Description>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Confirm Password */}
              <TextField
                isRequired
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                validate={(value) => {
                  if (!value) {
                    return "পাসওয়ার্ড আবার লিখুন";
                  }

                  if (value !== password) {
                    return "পাসওয়ার্ড দুটি মিলছে না";
                  }

                  return null;
                }}
              >
                <Label className="font-medium text-gray-700">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 transition hover:text-emerald-600"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeSlash className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Profile Image URL */}
              <TextField
                name="image"
                type="url"
                validate={(value) => {
                  if (!value) return null;

                  try {
                    new URL(value);
                    return null;
                  } catch {
                    return "সঠিক ছবি URL লিখুন";
                  }
                }}
              >
                <Label className="font-medium text-gray-700">
                  প্রোফাইল ছবির লিংক{" "}
                  <span className="font-normal text-gray-400">(ঐচ্ছিক)</span>
                </Label>

                <div className="relative">
                  <PersonWorker className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <Input
                    placeholder="https://example.com/profile.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />
                </div>

                <Description className="text-xs text-gray-400">
                  চাইলে আপনার প্রোফাইল ছবির URL দিতে পারেন।
                </Description>

                <FieldError className="text-sm text-red-500" />
              </TextField>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
              >
                <Check />
                অ্যাকাউন্ট তৈরি করুন
              </Button>
            </Form>

            {/* Sign In */}
            <p className="mt-7 text-center text-sm text-gray-500">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
