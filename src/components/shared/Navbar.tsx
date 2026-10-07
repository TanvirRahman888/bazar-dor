"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Close mobile menu after route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date();

    const banglaDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    setFormattedDate(banglaDate);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      {/* ================= TOP NAVBAR ================= */}
      <div className="border-b border-gray-200/70">
        <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white shadow-sm">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                {formattedDate}
              </p>
            </div>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/signin"
              className="font-semibold text-gray-800 transition hover:text-emerald-600"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              সাইন আপ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white/70 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ================= CATEGORY NAV ================= */}
      <nav className="bg-white/60 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Desktop Categories */}
          <div className="hidden h-14 items-center gap-2 overflow-x-auto md:flex">
            {loading ? (
              <CategorySkeleton />
            ) : (
              categories.map((category) => {
                const href = `/category/${category.slug}`;

                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={`group flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
                    }`}
                  >
                    <span className="text-base transition-transform group-hover:scale-110">
                      {category.icon}
                    </span>

                    <span>{category.nameBn}</span>
                  </Link>
                );
              })
            )}
          </div>

          {/* Mobile Horizontal Categories */}
          <div className="scrollbar-hide flex h-12 items-center gap-1 overflow-x-auto md:hidden">
            {loading ? (
              <CategorySkeleton />
            ) : (
              categories.map((category) => {
                const href = `/category/${category.slug}`;

                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100/80 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DROPDOWN ================= */}
      <div
        className={`overflow-hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-48 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2.5 text-center font-semibold text-gray-800 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ================= Loading Skeleton ================= */

function CategorySkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </>
  );
}
