import { ProductCard } from "@/products";
import { products } from "@/app/data";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        products.map(prod => (
            <ProductCard key={prod.id} {...prod}/>
        ))
      }
    </div>
  );
}