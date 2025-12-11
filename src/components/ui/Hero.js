import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_URL } from '@/data/contact';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden pattern-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="inline-block bg-gray-100 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-wider">
            Atención Exclusiva a Empresas y Licitaciones
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            Soluciones Textiles y <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-black">Confección Industrial.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Desde dotaciones de seguridad privada hasta proyectos especiales de gran volumen. Somos su fábrica aliada en Bogotá, sin intermediarios.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <Link href="/#soluciones" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-gray-900/20 hover:transform hover:-translate-y-1 transition duration-300">
              Ver Catálogo de Línea
            </Link>
            <a href={WHATSAPP_URL} className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition duration-300" target="_blank" rel="noopener noreferrer">
              Hablar con Gerencia
            </a>
          </div>

          {/* Imagen Principal */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 aspect-video">
            <Image 
              src="https://placehold.co/1200x600/e5e7eb/1f2937?text=VIDEO+HERO:+Mezcla+de+Maquinaria,+Corte+y+Producto+Final" 
              alt="Fábrica textil bogotá"
              fill
              className="object-cover opacity-90"
              priority
              unoptimized
            />
            
            {/* Etiqueta Flotante */}
            <div className="absolute bottom-0 left-0 bg-gray-900 text-white px-6 py-3 rounded-tr-xl text-xs font-bold uppercase tracking-wider">
              Maquinaria Propia • Entrega Garantizada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
