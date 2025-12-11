import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import { WHATSAPP_URL } from '@/data/contact';
import ContactForm from '@/components/ui/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';

export const metadata = {
  title: 'Fábrica de Dotaciones y Confección Industrial | El Arte',
  description: 'Somos su fábrica directa de uniformes y dotaciones en Bogotá. Especialistas en seguridad privada, industrial y maquila textil. Envíos nacionales 24h.',
  alternates: {
    canonical: 'https://confeccioneselarte.com',
  },
};

export default function Home() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://confeccioneselarte.com';
  // Seleccionamos productos estratégicos para mostrar primero (ej: los de seguridad)
  const featured = products.filter((p) => p.featured).slice(0, 6);

  const itemListJson = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": featured.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${base}/productos/${encodeURIComponent(p.slug)}`,
      "name": p.title,
      "image": p.images && p.images.length ? p.images[0] : undefined
    }))
  };

  return (
    <>
      <TopBar />
      <Header />
      <main>
        {/* HERO SECTION OPTIMIZADO */}
        <section className="relative bg-white overflow-hidden pattern-grid">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>

          <div className="container mx-auto px-4 py-10 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              <span className="inline-block bg-blue-50 border border-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-wider">
                Venta Directa a Empresas y Licitaciones
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
                Su Fábrica de Dotaciones <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-black">Sin Intermediarios.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Optimizamos su presupuesto de dotación eliminando revendedores. Confección industrial de alta resistencia con despacho inmediato desde nuestra planta en Bogotá hacia toda Colombia.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
                <Link href="/#soluciones" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-gray-900/20 hover:transform hover:-translate-y-1 transition duration-300">
                  Ver Catálogo B2B
                </Link>
                <a href={WHATSAPP_URL} className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition duration-300 flex items-center justify-center gap-2" target="_blank" rel="noopener noreferrer">
                  <span>Hablar con un Asesor</span>
                </a>
              </div>

              {/* Imagen Principal */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 aspect-video">
                <Image
                  src="https://placehold.co/1200x600/e5e7eb/1f2937?text=Planta+de+Produccion+Real+-+Sin+Stock+Photos"
                  alt="Fábrica de confección textil en Bogotá operando"
                  fill
                  className="object-cover opacity-90"
                  priority
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 bg-gray-900 text-white px-6 py-3 rounded-tr-xl text-xs font-bold uppercase tracking-wider">
                  Capacidad Instalada Real • Entrega Garantizada
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BARRA DE CLIENTES (Respaldo Social) */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              Proveedores de confianza para operaciones críticas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="https://placehold.co/120x40/transparent/333333?text=FUERZA+AEREA" width={120} height={40} alt="Dotación Fuerza Aérea" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=ANI" width={120} height={40} alt="Dotación ANI" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=ALCALDIAS" width={120} height={40} alt="Dotación Alcaldías" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=SEGURIDAD+PRIVADA" width={120} height={40} alt="Empresas Seguridad" className="h-8 md:h-10 object-contain w-auto" unoptimized />
              <Image src="https://placehold.co/120x40/transparent/333333?text=CONSTRUCTORAS" width={120} height={40} alt="Constructoras" className="h-8 md:h-10 object-contain w-auto" unoptimized />
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS (SEO INTERNO) */}
        {featured.length > 0 && (
          <section id="productos-destacados" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-2 block">Lo más solicitado</span>
                  <h2 className="text-3xl font-black text-gray-900">Referencias de Alta Rotación</h2>
                  <p className="text-gray-500 mt-2 max-w-xl">
                    Productos estandarizados listos para personalización y despacho rápido. Ideal para reposición de dotación inmediata.
                  </p>
                </div>
                <Link href="/productos" className="group flex items-center gap-2 text-sm font-bold text-gray-900 border-b-2 border-gray-200 pb-1 hover:border-gray-900 transition">
                  Explorar todo el catálogo
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featured.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CATEGORÍAS PRINCIPALES (Silos de Contenido) */}
        <section id="soluciones" className="py-24 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Soluciones por Industria</h2>
              <p className="text-gray-600 text-lg">
                No somos solo confeccionistas, somos especialistas técnicos. Entendemos la normativa y las exigencias de cada sector operativo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: Seguridad (El Fuerte) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300 group">
                <div className="h-56 rounded-xl overflow-hidden mb-6 relative bg-gray-200">
                  <Image
                    src="https://placehold.co/600x800/1f2937/ffffff?text=Dotacion+Vigilancia"
                    alt="Uniformes para vigilantes y escoltas"
                    width={600} height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] font-bold uppercase rounded">Más Vendido</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Privada</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  Cumplimos normativa de SuperVigilancia. Goleanas tipo legionario, chalecos tácticos porta-armas y uniformes de calle resistentes al desgaste.
                </p>
                <Link href="/productos#seguridad" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Ver línea de vigilancia <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>

              {/* Card 2: Industrial */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300 group">
                <div className="h-56 rounded-xl overflow-hidden mb-6 relative bg-gray-200">
                  <Image
                    src="https://placehold.co/600x800/374151/ffffff?text=Ropa+Industrial"
                    alt="Ropa de trabajo industrial"
                    width={600} height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Industrial y Logística</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  Ropa de trabajo para uso rudo. Overoles enterizos, petos de carnaza/PVC y chalecos reflectivos certificados para obra y bodega.
                </p>
                <Link href="/productos#industrial" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Ver dotación industrial <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>

              {/* Card 3: Maquila */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300 group">
                <div className="h-56 rounded-xl overflow-hidden mb-6 relative bg-gray-200">
                  <Image
                    src="https://placehold.co/600x800/4b5563/ffffff?text=Servicio+Maquila"
                    alt="Servicio de maquila textil"
                    width={600} height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Servicios de Maquila</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  ¿Tiene una marca o una licitación grande? Ponemos nuestra planta a su disposición. Corte, confección, ojal y botón industrial.
                </p>
                <Link href="/servicios/maquila-textil" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Cotizar servicio de corte <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* LA DIFERENCIA (Argumentos de Venta) */}
        <section id="capacidad" className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2 block">Garantía Operativa</span>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                  Más que uniformes, <br />entregamos cumplimiento.
                </h2>
                <div className="space-y-6 text-gray-300 text-lg">
                  <p>
                    Sabemos que un retraso en la dotación detiene la operación de sus vigilantes o técnicos. Por eso no tercerizamos procesos críticos.
                  </p>
                  <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span><strong>Inventario de Materia Prima:</strong> Telas en bodega para no depender de proveedores externos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span><strong>Maquinaria Propia:</strong> Corte automático y bordadoras multicabezal en casa.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span><strong>Trazabilidad:</strong> Sepa exactamente en qué etapa va su pedido.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 border-2 border-gray-700 rounded-2xl transform rotate-2"></div>
                <Image
                  src="https://placehold.co/600x600/374151/ffffff?text=CONTROL+DE+CALIDAD+REAL"
                  alt="Control de calidad textil"
                  width={600}
                  height={600}
                  className="relative rounded-xl shadow-2xl w-full transform -rotate-2 hover:rotate-0 transition duration-500"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        {/* JSON-LD ItemList para SEO de productos destacados */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
        />
      </main>
      <Footer />
    </>
  );
}