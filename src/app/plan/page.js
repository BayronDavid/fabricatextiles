import { planSEO } from '@/data/plan';
import Link from 'next/link';

export const metadata = {
  title: 'Plan Maestro SEO - Fábrica Textil',
  robots: 'noindex, nofollow', // Página interna
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gray-900 text-white p-8">
          <h1 className="text-3xl font-black mb-2">Plan Maestro de SEO Programático</h1>
          <p className="text-gray-400">Estrategia de dominación de nicho para &quot;Dotaciones y Uniformes&quot;</p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="text-4xl font-black text-blue-600 mb-2">{planSEO.ciudades.length}</div>
              <div className="text-sm font-bold text-blue-800 uppercase">Ciudades Objetivo</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <div className="text-4xl font-black text-green-600 mb-2">{planSEO.productos.length}</div>
              <div className="text-sm font-bold text-green-800 uppercase">Productos Core</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <div className="text-4xl font-black text-purple-600 mb-2">{planSEO.ciudades.length * planSEO.productos.length}</div>
              <div className="text-sm font-bold text-purple-800 uppercase">Combinaciones Posibles</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">1. Landing Pages por Ciudad (SEO Local)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {planSEO.ciudades.map((ciudad) => (
              <Link 
                key={ciudad.slug} 
                href={`/envios/${ciudad.slug}`}
                className="block p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                📍 {ciudad.nombre}
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">2. Páginas de Producto (Long Tail)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {planSEO.productos.map((prod) => (
              <Link 
                key={prod.slug} 
                href={`/productos/${prod.slug}`}
                className="flex items-center p-4 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg transition group"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 text-xl group-hover:bg-white transition">
                  👕
                </div>
                <div>
                  <div className="font-bold text-gray-900 group-hover:text-green-800">{prod.nombre}</div>
                  <div className="text-xs text-gray-500">/productos/{prod.slug}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <h3 className="font-bold text-yellow-800 mb-2">Estado del Sistema</h3>
            <p className="text-sm text-yellow-700">
              Todas las rutas anteriores son generadas estáticamente (SSG) al momento del build. 
              Esto garantiza tiempos de carga instantáneos y máxima indexación en Google.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}