'use client'

import { useCart } from "@/context/CartContext"

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string | null;
        price: number;
        image_url: string | null;
    }
}

export function ProductCard({ product }: ProductProps) {
    const { addToCart } = useCart();

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition flex flex-col justify-between h-full">
            <div>
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                        Sem foto
                    </div>
                )}

                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {product.description}
                </p>
            </div>

            <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-green-600">
                    R$ {product.price}
                </span>

                <button
                    onClick={() => addToCart(product)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 font-medium transition active:scale-95"
                >
                    Adicionar +
                </button>
            </div>
        </div>
    );
}