import AllProduct from "@/components/home/AllProduct";
import DecreasedProductPrice from "@/components/home/DecreasedProductPrice";
import Hero from "@/components/home/Hero";
import IncreasedProductPrice from "@/components/home/IncreasedProductPrice";
import PriceMarquee from "@/components/home/PriceMarquee";

export default function Home() {
  return (
    <div className="">
      <PriceMarquee />
      <Hero/>
      <IncreasedProductPrice/>
      <DecreasedProductPrice/>
      <AllProduct/>
    </div>
  );
}
