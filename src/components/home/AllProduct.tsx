import { Product } from "@/types";
import ProductList from "../product/ProductList";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
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
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 scroll-mt-32" id="allProduct">
      <h3 className="text-2xl font-bold">
        সব পণ্য
      </h3>

      <ProductList products={products} />
    </div>
  );
};

export default AllProduct;