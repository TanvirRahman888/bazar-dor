import { Product } from "@/types";
import ProductCard from "../product/ProductCard";
import SortDropdown from "../product/SortDropdown";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 360,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const AllProduct = async () => {
  const products: Product[] = await getProducts();
  return (
    <div className="container mx-auto px-8 ">
      <div>
        <h3 className="text-2xl font-bold">সব পণ্য</h3>
        <div className="flex justify-between items-center my-3">
          <p>
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
          <SortDropdown />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
