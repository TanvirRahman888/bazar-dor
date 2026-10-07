import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-linear-to-b from-white to-emerald-50/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-xl text-white shadow-md">
                🛒
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">বাজার দর</h2>
                <p className="text-xs text-gray-500">
                  প্রতিদিনের বাজার, এক জায়গায়
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600">
              প্রতিদিনের প্রয়োজনীয় পণ্যের বাজারদর সহজে দেখুন। চাল, ডাল,
              তেল, সবজি, মাছ, মাংসসহ বিভিন্ন পণ্যের সর্বশেষ মূল্য জানুন।
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <SocialLink
                href="https://facebook.com"
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>

              <SocialLink
                href="https://instagram.com"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>

              <SocialLink
                href="https://youtube.com"
                label="YouTube"
              >
                <YoutubeIcon />
              </SocialLink>

              <SocialLink
                href="https://linkedin.com"
                label="LinkedIn"
              >
                <LinkedinIcon />
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              দ্রুত লিংক
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <FooterLink href="/">হোম</FooterLink>
              <FooterLink href="/category/chal">চাল</FooterLink>
              <FooterLink href="/category/dal">ডাল</FooterLink>
              <FooterLink href="/category/sobji">সবজি</FooterLink>
              <FooterLink href="/category/mach">মাছ</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              যোগাযোগ
            </h3>

            <div className="mt-5 space-y-4">
              <ContactItem
                icon={<PhoneIcon />}
                title="ফোন"
                value="+880 1XXX-XXXXXX"
              />

              <ContactItem
                icon={<MailIcon />}
                title="ইমেইল"
                value="hello@bazardor.com"
              />

              <ContactItem
                icon={<ClockIcon />}
                title="সাপোর্ট সময়"
                value="সকাল ৯টা - রাত ১০টা"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-base font-bold text-gray-900">
              আমাদের ঠিকানা
            </h3>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <LocationIcon />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    বাজার দর
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    ঢাকা, বাংলাদেশ
                    <br />
                    বাংলাদেশ
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                যোগাযোগ করুন
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-100 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-emerald-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-emerald-700"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================
   Reusable Components
========================= */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="w-fit text-sm text-gray-600 transition hover:translate-x-1 hover:text-emerald-700"
    >
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-600 hover:text-white hover:shadow-md"
    >
      {children}
    </Link>
  );
}

function ContactItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================
   Icons
========================= */

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M22 12a10 10 0 1 0-11.563 9.874v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.77-1.63 1.56V12h2.773l-.443 2.887h-2.33v6.987A10.002 10.002 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05C21.15 8.59 22 11.24 22 14.68V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}