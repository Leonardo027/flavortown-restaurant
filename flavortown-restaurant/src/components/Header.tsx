'use client'
import { useCart } from "@/context/CartContext"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
    const { cartCount, openCart } = useCart()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.refresh()
    }
    
    return (
        <header className="bg-white shadow-sm p-6 mb-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-gray-800 cursor-pointer">
            🍔 Flavortown
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 hidden sm:block">Olá, {user.email}</span>
                    <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
                        Sair
                    </button>
                </div>
            ) : (
                <Link href="/login" className="text-gray-900 font-semibold hover:text-red-500">
                    Entrar
                </Link>
            )}

            <button 
                onClick={openCart} 
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                🛒 <span className="hidden sm:inline">Carrinho</span> ({cartCount})
            </button>
          </div>
        </div>
      </header>
    )
}