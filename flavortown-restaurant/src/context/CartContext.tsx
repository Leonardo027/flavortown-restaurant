'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: string) => void;
    total: number;
    cartCount: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('flavortown-cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem('flavortown-cart', JSON.stringify(items));
        }
    }, [items]);

    // Função para Adicionar
    function addToCart(product: any) {
        setItems(currentItems => {
            // Verifica se o item já existe
            const itemExists = currentItems.find(item => item.id === product.id);

            if (itemExists) {
                // Se existe, aumenta a quantidade
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Se não existe, adiciona novo
            return [...currentItems, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            }];
        });
    }

    // Função pra remover
    function removeFromCart(productId: string) {
        setItems(currentItems => currentItems.filter(item => item.id !== productId));
    }

    // Cálculos automáticos
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, total, cartCount,
            isCartOpen, openCart: () => setIsCartOpen(true), closeCart: () => setIsCartOpen(false) // NOVO
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);