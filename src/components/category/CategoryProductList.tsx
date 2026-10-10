"use client";

import { useMemo, useState } from "react";

import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import SortDropdown from "@/components/product/SortDropdown";

type CategoryProductListProps = {
  products: Product[];
};

const CategoryProductList = ({
  products,
}: CategoryProductListProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];

    switch (sort) {
      case "price-low-high":
        return productsCopy.sort(
          (a, b) => a.today - b.today,
        );

      case "price-high-low":
        return productsCopy.sort(
          (a, b) => b.today - a.today,
        );

      default:
        return productsCopy;
    }
  }, [products, sort]);

  return (
    <>
      {/* Top Bar */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          মোট{" "}
          <span className="font-semibold text-gray-900">
            {products.length.toLocaleString("bn-BD")}টি
          </span>{" "}
          পণ্য দেখানো হচ্ছে
        </p>

        <SortDropdown
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

export default CategoryProductList;