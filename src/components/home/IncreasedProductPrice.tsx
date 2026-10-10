import { Product } from '@/types';
import ProductCard from '../product/ProductCard';

const IncreasedProductPrice = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products")
    const products: Product[]= await res.json()

    const increase: Product[] = products.filter(
    (product) => product.change?.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0,6);
    console.log(increase);

    return (
        <div className="container mx-auto px-4 my-4">
            <h2 className="text-xl font-bold my-4"><span className="text-red-500">▲</span> আজ দাম বেড়েছে</h2>
            <div className="grid grid-cols-3 gap-3">
                
            {
                increase.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
            }
            </div>
        </div>
    );
};

export default IncreasedProductPrice;