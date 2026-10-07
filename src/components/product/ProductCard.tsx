import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-2xl border border-emerald-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      {/* Top */}
      <div className="flex items-start gap-4">
        {/* Product Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-3xl transition group-hover:bg-emerald-100">
          {product.image}
        </div>

        {/* Product Name */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-sm text-gray-500">
            প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-end justify-between">
        {/* Price */}
        <div>
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            ৳ {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        {/* Change */}
        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${
            isUp
              ? "bg-red-50 text-red-500"
              : isDown
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? (
            <span>▲</span>
          ) : isDown ? (
            <span>▼</span>
          ) : (
            <span>●</span>
          )}

          <span>
            {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;