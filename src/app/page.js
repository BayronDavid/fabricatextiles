import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import ContactForm from '@/components/ui/ContactForm';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Fábrica de Dotaciones y Confección Industrial | El Arte',
  description: 'Fábrica directa de uniformes, dotaciones de seguridad y maquila textil en Bogotá. Envíos a toda Colombia y Ecuador. Solicite cotización mayorista.',
  alternates: {
    canonical: 'https://confeccioneselarte.com',
  },
};

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />

        {/* BARRA DE CLIENTES */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              Empresas y Entidades que confían en nuestra manufactura
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
              {/* Logos Placeholders */}
              <Image src="https://placehold.co/120x40/transparent/333333?text=FUERZA+AEREA" width={120} height={40} alt="Cliente Fuerza Aerea" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=ANI" width={120} height={40} alt="Cliente ANI" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=ALCALDIA" width={120} height={40} alt="Cliente Alcaldia" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=ACON+SECURITY" width={120} height={40} alt="Cliente Acon" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=HORZON" width={120} height={40} alt="Cliente Horzon" className="h-8 md:h-10 object-contain w-auto" unoptimized />
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section id="soluciones" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4">¿Qué fabricamos?</h2>
              <div className="w-20 h-1 bg-gray-900 mb-6"></div>
              <p className="text-gray-600 max-w-2xl text-lg">
                Aunque somos referentes en el sector seguridad, nuestra planta tiene la versatilidad para confeccionar desde uniformes técnicos hasta material promocional masivo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Seguridad */}
              <div className="group relative bg-gray-50 rounded-2xl border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                <div className="h-64 rounded-xl overflow-hidden mb-6 relative">
                  <Image 
                    src="https://placehold.co/600x800/d1d5db/1f2937?text=Seguridad+Privada" 
                    alt="Uniformes vigilancia" 
                    width={600} 
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 text-xs font-bold rounded shadow">ESPECIALIDAD</div>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Seguridad Privada</h3>
                  <p className="text-sm text-gray-600 mb-4">Goleanas (tipo legionario), chalecos porta-elementos, impermeables y rompevientos tácticos.</p>
                  <ul className="text-xs text-gray-500 space-y-2 mb-6 border-t border-gray-200 pt-4">
                    <li>• Cumplimiento de normativa</li>
                    <li>• Telas de alta resistencia</li>
                  </ul>
                  <Link href="/productos/goleanas-legionario" className="block w-full py-3 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition text-center">
                    Ver Dotación Vigilancia
                  </Link>
                </div>
              </div>

              {/* Card 2: Industrial */}
              <div className="group bg-gray-50 rounded-2xl border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                <div className="h-64 rounded-xl overflow-hidden mb-6">
                  <Image 
                    src="https://placehold.co/600x800/e5e7eb/1f2937?text=Industrial+y+Logistica" 
                    alt="Chalecos industriales" 
                    width={600} 
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Industrial y Logística</h3>
                  <p className="text-sm text-gray-600 mb-4">Chalecos acolchados, overoles, petos, delantales y ropa de trabajo pesado.</p>
                  <ul className="text-xs text-gray-500 space-y-2 mb-6 border-t border-gray-200 pt-4">
                    <li>• Personalización con bordados</li>
                    <li>• Protección térmica y reflectiva</li>
                  </ul>
                  <Link href="/productos/chalecos-vigilancia" className="block w-full py-3 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition text-center">
                    Ver Línea Industrial
                  </Link>
                </div>
              </div>

              {/* Card 3: Maquila */}
              <div className="group bg-gray-50 rounded-2xl border border-gray-200 p-2 hover:border-gray-400 transition-colors">
                <div className="h-64 rounded-xl overflow-hidden mb-6">
                  <Image 
                    src="https://placehold.co/600x800/f3f4f6/1f2937?text=Proyectos+Especiales" 
                    alt="Maquila textil" 
                    width={600} 
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Proyectos Especiales</h3>
                  <p className="text-sm text-gray-600 mb-4">¿Necesita algo específico? Fabricamos gorras publicitarias, bolsas cambre y desarrollos a medida.</p>
                  <ul className="text-xs text-gray-500 space-y-2 mb-6 border-t border-gray-200 pt-4">
                    <li>• Producción de alto volumen</li>
                    <li>• Maquila para licitaciones</li>
                  </ul>
                  <Link href="/servicios/maquila-textil" className="block w-full py-3 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition text-center">
                    Cotizar Proyecto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LA DIFERENCIA */}
        <section id="capacidad" className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 transform -skew-x-12 translate-x-20 opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">Por qué elegirnos</span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  Disciplina Operativa y <br />Cumplimiento Real.
                </h2>
                <div className="space-y-8 text-gray-300 text-lg">
                  <p>
                    En un mercado lleno de intermediarios, nosotros ofrecemos la seguridad de una <strong>fábrica real</strong>. Desde 2019, hemos trasladado la disciplina y el rigor del servicio institucional a nuestra línea de producción.
                  </p>
                  <p>
                    Entendemos que un retraso en sus uniformes es un problema operativo para su empresa. Por eso invertimos en maquinaria propia y stock de materia prima.
                  </p>
                </div>
                
                <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-700 pt-8">
                  <div>
                    <span className="block text-3xl font-bold text-white mb-1">100%</span>
                    <span className="text-xs text-gray-400 uppercase">Maquinaria Propia</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-white mb-1">24h</span>
                    <span className="text-xs text-gray-400 uppercase">Respuesta Ágil</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-gray-600 rounded-2xl"></div>
                <Image 
                  src="https://placehold.co/600x600/374151/ffffff?text=FOTO+REAL:+Primer+Plano+Costura" 
                  alt="Calidad costura" 
                  width={600} 
                  height={600}
                  className="relative rounded-xl shadow-2xl w-full"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
