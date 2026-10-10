"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types";
import SortDropdown from "./SortDropdown";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({
  products,
}: ProductListProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const newProducts = [...products];

    if (sort === "price-low-high") {
      return newProducts.sort(
        (a, b) => a.today - b.today,
      );
    }

    if (sort === "price-high-low") {
      return newProducts.sort(
        (a, b) => b.today - a.today,
      );
    }

    return newProducts;
  }, [products, sort]);

  return (
    <>
      <div className="my-3 flex items-center justify-between">
        <p>
          মোট{" "}
          {products.length.toLocaleString(
            "bn-BD",
          )}
          টি পণ্য দেখানো হচ্ছে
        </p>

        <SortDropdown
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;