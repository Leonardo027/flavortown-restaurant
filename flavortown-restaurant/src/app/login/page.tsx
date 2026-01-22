'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) alert(error.message)
            else {
                alert('Conta criada! Entrando...')
                await supabase.auth.signInWithPassword({ email, password })
                router.push('/')
                router.refresh()
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) alert('Erro: Verifique email e senha')
            else {
                router.push('/')
                router.refresh()
            }
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    🍔 Flavortown
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    {isSignUp ? 'Crie sua conta para pedir' : 'Faça login para continuar'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email" required
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 border focus:ring-red-500 focus:border-red-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password" required minLength={6}
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 p-3 border focus:ring-red-500 focus:border-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg hover:shadow-xl active:scale-95"
                    >
                        {loading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
                    </button>
                </form>

                <div className="mt-6 text-center border-t pt-4">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-gray-600 hover:text-red-600 text-sm font-medium transition"
                    >
                        {isSignUp ? 'Já tem conta? Faça Login' : 'Não tem conta? Crie agora'}
                    </button>
                </div>
            </div>
        </div>
    )
}