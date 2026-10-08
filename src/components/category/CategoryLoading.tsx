const CategoryLoading = () => {
  return (
    <main className="min-h-screen bg-[#f4f8f4] py-8">
      <div className="container mx-auto px-4">
        {/* Category Header Skeleton */}
        <section className="rounded-2xl border border-emerald-100 bg-white px-6 py-7 shadow-sm sm:px-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-gray-200" />

            <div className="flex-1">
              <div className="h-7 w-36 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-3 h-4 w-52 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </section>

        {/* Products Header Skeleton */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />

              <div className="h-10 w-40 animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>

          {/* Product Card Skeletons */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                {/* Top */}
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-gray-100" />

                  <div className="flex-1">
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />

                    <div className="mt-2 h-6 w-24 animate-pulse rounded bg-gray-200" />
                  </div>

                  <div className="h-8 w-16 animate-pulse rounded-full bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryLoading;