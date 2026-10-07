import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-95 items-center gap-10 overflow-hidden rounded-[28px] border border-emerald-100 bg-white px-6 py-10 shadow-sm sm:px-10 lg:grid-cols-2 lg:px-14">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              {formattedDate}
            </span>

            <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="mt-7">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-60 w-70 sm:h-75 sm:w-90 lg:h-80 lg:w-100">
              <Image
                src="/bazar-hero.png"
                alt="বাজারের পণ্যের ঝুড়ি"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
