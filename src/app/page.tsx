import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import PriceMarquee from "@/components/home/PriceMarquee";
import AllProduct from "@/components/home/AllProduct";
import Category from "./category/page";

export default function Home() {
  return (
    <>
      <Suspense fallback={<PriceMarqueeLoading />}>
        <PriceMarquee />
      </Suspense>

      <Hero />

      <Suspense fallback={<CategoryLoading />}>
        <Category />
      </Suspense>

      <Suspense fallback={<ProductsLoading />}>
        <AllProduct />
      </Suspense>
    </>
  );
}

function PriceMarqueeLoading() {
  return (
    <div className="h-10 w-full animate-pulse border-y bg-gray-100" />
  );
}

function CategoryLoading() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsLoading() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-44 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}