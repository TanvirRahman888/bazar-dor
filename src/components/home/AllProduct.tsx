import ProductCard from "../product/ProductCard";
import SortDropdown from "../product/SortDropdown";


const AllProduct =async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products")
    const products= await res.json()
    return (
        <div className="container mx-auto px-8 ">
            <div >
                <h3 className="text-2xl font-bold">সব পণ্য</h3>
                <div className="flex justify-between items-center my-3">
                    <p>মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
                    <SortDropdown/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                
            {
                products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
            }
            </div>
        </div>
    );
};

export default AllProduct;