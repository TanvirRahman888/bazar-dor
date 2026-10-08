import { getCategory, iCategory } from "@/app/category/page";
import { getProducts } from "@/components/home/AllProduct";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";
import { notFound } from "next/navigation";

export type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function CategoryContent({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  // Get categories
  const allCategory: iCategory[] = await getCategory();

  // Find current category
  const tCategory = allCategory.find(
    (category) => category.slug === slug
  );

  if (!tCategory) {
    notFound();
  }

  // Get products
  const allProducts: Product[] = await getProducts();

  // Filter products by category
  const tProducts = allProducts.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-[#f4f8f4] py-8">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <section className="rounded-2xl border border-emerald-100 bg-white px-6 py-7 shadow-sm sm:px-8">
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
              {tCategory.icon}
            </div>

            {/* Category Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {tCategory.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                {tProducts.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mt-8">
          {/* Top Bar */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">
              মোট{" "}
              <span className="font-semibold text-gray-900">
                {tProducts.length.toLocaleString("bn-BD")}টি
              </span>{" "}
              পণ্য দেখানো হচ্ছে
            </p>

            {/* Sort Dropdown - UI only */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-600"
              >
                সাজান
              </label>

              <select
                id="sort"
                defaultValue="default"
                className="cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="default">ডিফল্ট</option>

                <option value="low-high">
                  দাম: কম থেকে বেশি
                </option>

                <option value="high-low">
                  দাম: বেশি থেকে কম
                </option>

                <option value="increase">
                  দাম বৃদ্ধি
                </option>

                <option value="decrease">
                  দাম কমেছে
                </option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {tProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-100 bg-white py-16 text-center">
              <div className="text-5xl">
                {tCategory.icon}
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                কোনো পণ্য পাওয়া যায়নি
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}