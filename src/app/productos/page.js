import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductsExplorer from '@/components/ui/ProductsExplorer';
import { products } from '@/data/products';

export const metadata = {
  title: 'Catálogo de Productos - Confecciones El Arte',
  description: 'Catálogo completo de dotaciones, gorras, chalecos, impermeables y maquila industrial. Fábrica directa en Bogotá con envíos nacionales.',
  alternates: {
    canonical: '/productos',
  },
};

function buildItemListJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://tudominio.com/productos/${p.slug}`,
      name: p.title,
      image: p.images?.[0],
    })),
  };
}

export default function ProductsPage() {
  const jsonLd = buildItemListJsonLd(products);
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white">
        <section className="bg-gray-50 border-b border-gray-200 py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-3">Catálogo</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Dotaciones, Maquila y Promocionales en un solo lugar
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Filtra por categoría, familia o tags. Sin precios públicos: cotizamos según volumen y entrega.
            </p>
            <div className="flex flex-wrap gap-3 mt-6 text-sm text-gray-500">
              <a href="#seguridad" className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300">Seguridad</a>
              <a href="#industrial" className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300">Industrial</a>
              <a href="#masivo-promocional" className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300">Masivo / Promocional</a>
              <a href="#servicios" className="px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300">Servicios / Maquila</a>
              <a href="#destacados" className="px-3 py-1 rounded-full border border-gray-900 text-gray-900 bg-white shadow-sm">Destacados</a>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl space-y-12">
            <ProductsExplorer products={products} />
          </div>
        </section>

        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-300 mb-2">Cotizaciones directas</p>
              <h2 className="text-2xl font-black">Obtén precios y plazos según tu volumen</h2>
              <p className="text-gray-300 text-sm mt-2">Atención inmediata por WhatsApp o correo para empresas y licitaciones.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="https://wa.me/573000000000" className="px-5 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100" target="_blank" rel="noopener noreferrer">WhatsApp Fábrica</a>
              <a href="mailto:comercial@confeccioneselarte.com" className="px-5 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900">Correo Comercial</a>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}
