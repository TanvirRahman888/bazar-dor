import { Product } from "@/types";
import ProductCard from "../product/ProductCard";
const DecreasedProductPrice = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const products: Product[] = await res.json();

  const decrease: Product[] = products.filter((product) => product.change?.dir === "down").sort((b, a) => b.change.pct - a.change.pct).slice(0, 6);

  return (
    <div className="container mx-auto px-8 my-4">
      <h2 className="text-xl font-bold my-4">
        <span className="text-green-500">▲</span> আজ দাম বেড়েছে
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {decrease.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default DecreasedProductPrice;
