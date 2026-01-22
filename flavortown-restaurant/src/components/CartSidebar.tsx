'use client'

import { useCart } from "@/context/CartContext"

export function CartSidebar() {
    const { isCartOpen, closeCart, items, removeFromCart, total } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeCart}></div>
            <div className="relative ww-full max-w-md bg-white h-full shadow-2xl p-6 flex-col animate-slide-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Seu Pedido</h2>
                    <button onClick={closeCart} className="text-gray-500 hover:text-gray-800 text-xl font-bold">X</button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio 🍔</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">R$ {item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded"
                    >
                        🗑️
                    </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total</span>
                <span className="text-xl font-bold text-green-600">R$ {total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Finalizar Compra
            </button>
        </div>

      </div>
    </div>
  );
}