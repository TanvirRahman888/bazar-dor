"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { ArrowRightToSquare, PersonWorker } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Better Auth session
  const { data: session, isPending } = useSession();

  const user = session?.user;

  // ================= Categories =================
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

  // ================= Close menus after route change =================
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // ================= Current Date =================
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const banglaDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setFormattedDate(banglaDate);
  }, []);

  // ================= Close profile dropdown outside =================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ================= Logout =================
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await signOut();

      setProfileOpen(false);
      setMenuOpen(false);

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      {/* ================= TOP NAVBAR ================= */}

      <div className="relative z-50 border-b border-gray-200/70 bg-white/95">
        <div className="container mx-auto flex h-17 items-center justify-between px-4 sm:px-6 lg:px-8">
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

          {/* ================= DESKTOP AUTH ================= */}

          <div className="hidden items-center md:flex">
            {isPending ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            ) : user ? (
              <div ref={profileRef} className="relative z-25">
                {/* Dropdown trigger */}
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-100"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border border-emerald-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span className="max-w-36 truncate text-sm font-semibold text-gray-800">
                    {user.name}
                  </span>

                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-full z-25 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/70 transition-all duration-200 ${
                    profileOpen
                      ? "visible translate-y-0 scale-100 opacity-100"
                      : "invisible -translate-y-2 scale-95 opacity-0"
                  }`}
                >
                  {/* User info */}
                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name ?? "User"}
                          width={48}
                          height={48}
                          className="h-12 w-12 shrink-0 rounded-full border border-emerald-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {user.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <PersonWorker />

                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowRightToSquare />

                      <span>{logoutLoading ? "লগআউট হচ্ছে..." : "লগআউট"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
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
            )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

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

      <nav className="relative z-10 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop */}

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
                        ? "bg-green-200"
                        : "text-gray-700 hover:bg-gray-100 hover:text-green-400"
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

          {/* Mobile categories */}

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

      {/* ================= MOBILE AUTH MENU ================= */}

      <div
        className={`overflow-hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {isPending ? (
            <div className="h-16 animate-pulse rounded-xl bg-gray-100" />
          ) : user ? (
            /* Logged in mobile */
            <div>
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-emerald-100 object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 hover:bg-gray-100"
              >
                <PersonWorker />
                আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                <ArrowRightToSquare />

                {logoutLoading ? "লগআউট হচ্ছে..." : "লগআউট"}
              </button>
            </div>
          ) : (
            /* Logged out mobile */
            <div className="flex flex-col gap-2">
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
          )}
        </div>
      </div>
    </header>
  );
}

/* ================= Category Skeleton ================= */

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
