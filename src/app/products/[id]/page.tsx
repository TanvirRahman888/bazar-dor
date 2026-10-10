import { getProducts } from "@/components/home/AllProduct";
import { Product } from "@/types";
import { Button } from "@heroui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const products: Product[] = await getProducts();

  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    notFound();
  }

  const marketMins = product.markets.map((market) => market.min);
  const marketMaxs = product.markets.map((market) => market.max);

  const lowestPrice = Math.min(...marketMins);
  const highestPrice = Math.max(...marketMaxs);

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitBn =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "litre"
        ? "লিটার"
        : product.unit;

  return (
    <main className="min-h-screen bg-[#f4f8f4] py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href={"/"}><span>হোম</span></Link>
          <span>/</span>
          <Link href={`/category/${product.category}`}><span>{product.categoryNameBn}</span></Link>
          <span>/</span>
          <span className="font-medium text-gray-800">{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-4xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unitBn} · {product.categoryNameBn}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  গতকালের তুলনায় আজ দাম{" "}
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </p>
              </div>
            </div>

            {/* Today Price */}
            <div className="rounded-2xl bg-[#f4f8f4] px-6 py-4 text-center sm:min-w-36">
              <p className="text-sm text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {product.today.toLocaleString("bn-BD")}
              </p>

              <p className="text-sm text-gray-500">টাকা / {unitBn}</p>

              <div
                className={`mt-2 flex items-center justify-center gap-1 text-sm font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                      ? "text-emerald-600"
                      : "text-gray-500"
                }`}
              >
                <span>{isUp ? "▲" : isDown ? "▼" : "●"}</span>

                <span>
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              value={lowestPrice}
              subtitle="সবচেয়ে কম দামের বাজার"
              color="green"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              value={highestPrice}
              subtitle="সবচেয়ে বেশি দামের বাজার"
              color="red"
            />

            <SummaryCard
              title="গড় দাম"
              value={averagePrice}
              subtitle="প্রতি ইউনিটের গড় হিসেবে"
              color="emerald"
            />
          </div>

          {/* Market Table */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full border-collapse">
                <thead className="bg-[#f8faf8]">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-4 py-4 text-xl font-bold text-black">বাজার</th>

                    <th className="px-4 py-4 text-xl font-bold text-black">বিভাগ</th>

                    <th className="px-4 py-4 text-xl font-bold text-black">সর্বনিম্ন</th>

                    <th className="px-4 py-4 text-xl font-bold text-black">সর্বোচ্চ</th>

                    <th className="px-4 py-4 text-xl font-bold text-black text-right">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => {
                    const avg = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-gray-100 text-sm ${
                          index % 2 === 0 ? "bg-white" : "bg-[#f6f9f6]"
                        }`}
                      >
                        <td className="px-4 py-4 font-medium text-gray-800">
                          {market.market}
                        </td>

                        <td className="px-4 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {market.min.toLocaleString("bn-BD")} টাকা
                        </td>

                        <td className="px-4 py-4 text-gray-700">
                          {market.max.toLocaleString("bn-BD")} টাকা
                        </td>

                        <td className="px-4 py-4 text-right font-semibold text-gray-900">
                          {avg.toLocaleString("bn-BD", {
                            maximumFractionDigits: 1,
                          })}{" "}
                          টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
              <Button variant="ghost" className={"text-xl font-bold my-5 p-4 p2-2"}><Link href={`/category/${product.category}`}><span>{product.categoryIcon} {" "}সব {" "}{product.categoryNameBn}</span></Link></Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;

function SummaryCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: number;
  subtitle: string;
  color: "green" | "red" | "emerald";
}) {
  const textColor =
    color === "red"
      ? "text-red-500"
      : color === "green"
        ? "text-green-600"
        : "text-emerald-600";

  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-2 text-2xl font-bold ${textColor}`}>
        {value.toLocaleString("bn-BD", {
          maximumFractionDigits: 1,
        })}{" "}
        টাকা
      </p>

      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
