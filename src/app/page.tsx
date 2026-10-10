import { Suspense } from "react";

import Hero from "@/components/home/Hero";
import PriceMarquee from "@/components/home/PriceMarquee";
import AllProduct from "@/components/home/AllProduct";
import DecreasedProductPrice from "@/components/home/DecreasedProductPrice";
import IncreasedProductPrice from "@/components/home/IncreasedProductPrice";

export default function Home() {
  return (
    <>
      <Suspense fallback={<PriceMarqueeLoading />}>
        <PriceMarquee />
      </Suspense>

      <Hero />

      <Suspense fallback={<ProductsLoading />}>
        <IncreasedProductPrice />
      </Suspense>
      <Suspense fallback={<ProductsLoading />}>
        <DecreasedProductPrice />
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