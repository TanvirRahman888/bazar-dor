import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 via-white to-green-50 px-4">
      {/* Background decoration */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-100 bg-white/70 text-4xl shadow-lg shadow-emerald-100 backdrop-blur-xl">
          🛒
        </div>

        {/* 404 */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Page Not Found
        </p>

        <h1 className="bg-linear-to-r from-emerald-600 to-green-800 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, ঠিকানা পরিবর্তন
          হয়েছে, অথবা লিংকটি ভুল হতে পারে।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
          >
            <HomeIcon />
            হোমে ফিরে যান
          </Link>

          <Link
            href="/category/chal"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-6 py-3 font-semibold text-gray-700 shadow-sm backdrop-blur-xl transition duration-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 sm:w-auto"
          >
            বাজার দেখুন
            <ArrowIcon />
          </Link>
        </div>

        {/* Small footer text */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          বাজার দর
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    </main>
  );
}

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}