import { Product } from "@/app/data/products/products";
import { Metadata } from "next";
import { products } from '@/app/data';
import { cookies } from "next/headers";
import { ItemCard } from "@/shopping-cart";
import { WidgetItem } from "@/components";


export const metadata: Metadata = {
    title: 'Cart Page',
    description: 'Cart products details'
}

interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {

    const productsInCart: ProductInCart[] = [];

    for (const id of Object.keys(cart)) {

        const product = products.find(prod => prod.id === id);
        if (product) {
            productsInCart.push({ product: product, quantity: cart[id] });
        }

    }

    return productsInCart;
}

export default function CartPage() {

    const cookieStore = cookies();
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number };
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce((prev, current) => (
        current.product.price * current.quantity
    ) + prev, 0 );

    return (
        <div>
            <h1 className="text-5xl">Cart Products</h1>
            <hr className="mb-2"></hr>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col sm:w-8/12 gap-2 w-full">
                    {
                        productsInCart.map(({ product, quantity }) => (
                            <ItemCard key={product.id} product={product} quantity={quantity} />
                        ))
                    }
                </div>

                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem tittle="Total">
                        <div className="mt-2 text-end gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">${ (totalToPay * 1.15).toFixed(2)}</h3>
                        </div>
                        <span className="font-bold text-end text-gray-500">Taxes: ${ (totalToPay * 0.15).toFixed(2)}</span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}