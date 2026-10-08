export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f8f4] py-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-7 flex items-center gap-2">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Product Header Card */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-gray-100" />

              <div>
                <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />

                <div className="mt-2 h-4 w-28 animate-pulse rounded bg-gray-100" />

                <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-100" />
              </div>
            </div>

            {/* Price */}
            <div className="w-full rounded-2xl bg-[#f7faf7] p-4 sm:w-36">
              <div className="mx-auto h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-8 w-16 animate-pulse rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-4 w-20 animate-pulse rounded bg-gray-100" />
              <div className="mx-auto mt-2 h-4 w-14 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-6">
          {/* Summary title */}
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

          {/* Summary Cards */}
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                <div className="mt-3 h-6 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>

          {/* Market title */}
          <div className="mt-7 h-6 w-44 animate-pulse rounded bg-gray-200" />

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 bg-gray-50 px-4 py-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: 9 }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-5 gap-4 px-4 py-4 ${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-[#f4f8f4]"
                }`}
              >
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}