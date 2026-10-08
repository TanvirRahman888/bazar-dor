import Link from "next/link";

export interface iCategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
export const getCategory = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  return res.json();
};
const Category = async () => {
  const allCategory: iCategory[] = await getCategory();
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">পণ্যের ক্যাটাগরি</h2>

          <p className="mt-1 text-sm text-gray-500">
            প্রয়োজনীয় ক্যাটাগরি নির্বাচন করুন
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {allCategory.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group rounded-2xl border border-emerald-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                {category.icon}
              </div>

              {/* Name */}
              <h3 className="mt-3 font-semibold text-gray-800 transition group-hover:text-emerald-700">
                {category.nameBn}
              </h3>

              <p className="mt-1 text-xs text-gray-400">পণ্য দেখুন</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
