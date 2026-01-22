import { supabase } from '../lib/supabase';

// Essa função roda no Servidor (Server Component) antes da página ir pro navegador

export default async function Home() {
  
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    return <div>Erro ao carregar produtos: {error.message}</div>
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text3x1 font-bold mb-6 text-center text-gray-800">Flavortown Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-x1 transition">
            {product.image_url && ( <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-md mb-4"
            />)}
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            <div className="mt-4 flex justify-between itens-center">
              <span className="text-lg font-bold text-green-600">
                R$ {product.price}
              </span>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Adicionar</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}