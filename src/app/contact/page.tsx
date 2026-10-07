import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Hero */}
      <section className="border-b border-emerald-100 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            যোগাযোগ
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            আমাদের সাথে যোগাযোগ করুন
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            কোনো প্রশ্ন, পরামর্শ বা বাজারদর সংক্রান্ত তথ্য জানাতে চাইলে
            আমাদের সাথে যোগাযোগ করুন। আমরা যত দ্রুত সম্ভব আপনার বার্তার
            উত্তর দেওয়ার চেষ্টা করব।
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Side */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              যোগাযোগের তথ্য
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              কথা বলতে চান?
            </h2>

            <p className="mt-3 max-w-lg leading-7 text-gray-600">
              নিচের যেকোনো মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ContactCard
              icon={<PhoneIcon />}
              title="ফোন"
              value="+880 1XXX-XXXXXX"
              href="tel:+8801XXXXXXXXX"
            />

            <ContactCard
              icon={<MailIcon />}
              title="ইমেইল"
              value="hello@bazardor.com"
              href="mailto:hello@bazardor.com"
            />

            <ContactCard
              icon={<LocationIcon />}
              title="ঠিকানা"
              value="ঢাকা, বাংলাদেশ"
            />

            <ContactCard
              icon={<ClockIcon />}
              title="সাপোর্ট সময়"
              value="প্রতিদিন সকাল ৯টা - রাত ১০টা"
            />
          </div>

          {/* Social */}
          <div className="rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
            <h3 className="font-bold text-gray-900">
              সোশ্যাল মিডিয়ায় আমাদের সাথে থাকুন
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              সর্বশেষ আপডেট এবং বাজারদর জানতে আমাদের অনুসরণ করুন।
            </p>

            <div className="mt-5 flex gap-3">
              <SocialButton href="https://facebook.com" label="Facebook">
                <FacebookIcon />
              </SocialButton>

              <SocialButton href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </SocialButton>

              <SocialButton href="https://youtube.com" label="YouTube">
                <YoutubeIcon />
              </SocialButton>

              <SocialButton href="https://linkedin.com" label="LinkedIn">
                <LinkedinIcon />
              </SocialButton>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-xl shadow-emerald-100/50 backdrop-blur-xl sm:p-8">
          <div>
            <p className="text-sm font-semibold text-emerald-600">
              বার্তা পাঠান
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              আমরা আপনার কথা শুনতে চাই
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              নিচের ফর্মটি পূরণ করুন। আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
            </p>
          </div>

          <form className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ফোন নাম্বার
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                বিষয়
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="আপনার বার্তার বিষয় লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                বার্তা
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="আপনার বার্তা লিখুন..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              বার্তা পাঠান
              <SendIcon />
            </button>
          </form>

          <p className="mt-5 text-center text-xs leading-5 text-gray-400">
            আপনার তথ্য নিরাপদ রাখা হবে এবং অন্য কারো সাথে শেয়ার করা হবে না।
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-emerald-600 px-6 py-10 text-center text-white shadow-xl shadow-emerald-200 sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            আজকের বাজারদর দেখতে চান?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ বিভিন্ন পণ্যের সর্বশেষ বাজারদর
            দেখুন।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            বাজারদর দেখুন
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400">{title}</p>
        <p className="mt-1 font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:-translate-y-1 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
    >
      {children}
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className="h-5 w-5"
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

function LocationIcon() {
  return (
    <svg
      className="h-5 w-5"
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

function ClockIcon() {
  return (
    <svg
      className="h-5 w-5"
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

function SendIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
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
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.2 3.5-6.2 3.5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05C21.15 8.59 22 11.24 22 14.68V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}