import { Product } from "@/types";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceMarquee = async () => {
  const getProducts = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 360,
      },
    },
  );

  const products: Product[] = await getProducts.json();

  const changedProducts: Product[] = products.filter(
    (product) => product.change?.dir === "up" || product.change?.dir === "down",
  );

  return (
    <div className="my-2">
      <MarqueeText
        playOnlyInView={true}
        duration={10}
        pauseOnHover={true}
        direction="right"
      >
        {changedProducts.map((product) => (
          <span className="border-r px-2" key={product.id}>
            {product.image} {product.nameBn}{" "}
            {product.today.toLocaleString("bn-BD")}{" "}
            {product.unit == "kg" ? "টাকা/কেজি" : "টাকা/লিটার"}{" "}
            {product.change.dir == "up" ? (
              <span className="text-red-400">▲</span>
            ) : (
              <span className="text-green-400">▼</span>
            )}{" "}
            {product.change.pct.toLocaleString("bn-BD")}%
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default PriceMarquee;
