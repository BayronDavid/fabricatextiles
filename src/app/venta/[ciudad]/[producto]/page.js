import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/ui/Hero';
import ContactForm from '@/components/ui/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { cities } from '@/data/cities';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://confeccioneselarte.com';

function getCity(slug) {
  return cities.find((c) => c.slug === slug);
}

function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return cities.flatMap((city) =>
    products.map((product) => ({
      ciudad: city.slug,
      producto: product.slug,
    }))
  );
}

export async function generateMetadata({ params }) {
  const { ciudad, producto } = await params;
  const city = getCity(ciudad);
  const product = getProduct(producto);

  if (!city || !product) {
    return {
      title: 'Landing no encontrada',
      description: 'La página solicitada no está disponible.',
    };
  }

  const title = `Fábrica de ${product.shortTitle} en ${city.name} | Venta al Por Mayor`;
  const description = `Somos proveedores directos de ${product.shortTitle} con despacho a ${city.name}. Planta en Bogotá, precios de fábrica y tiempos ágiles.`;
  const url = `${siteUrl}/venta/${city.slug}/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: product.images,
    },
  };
}

export default async function VentaCiudadProductoPage({ params }) {
  const { ciudad, producto } = await params;
  const city = getCity(ciudad);
  const product = getProduct(producto);

  if (!city || !product) {
    notFound();
  }

  const heroTitle = `Venta de ${product.shortTitle} con despacho a ${city.name}`;
  const heroDescription = `Fábrica en Bogotá con logística directa a ${city.name}. Producción propia, cumplimiento en tiempos y personalización para licitaciones y contratos B2B.`;
  const pageUrl = `${siteUrl}/venta/${city.slug}/${product.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: heroTitle,
    description: heroDescription,
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    brand: {
      '@type': 'Organization',
      name: 'Confecciones El Arte',
    },
    serviceType: product.title,
    url: pageUrl,
    image: product.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price: '0',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    },
  };

  const uspCards = [
    {
      title: 'Planta en Bogotá',
      text: 'Producción propia, control de calidad y stock de materia prima listo para despachar.',
    },
    {
      title: `Ruta a ${city.name}`,
      text: 'Logística terrestre y aérea con entregas programadas 24-72h según volumen.',
    },
    {
      title: 'Personalización total',
      text: 'Bordado, estampado y especificaciones técnicas según pliego o manual interno.',
    },
  ];

  return (
    <>
      <TopBar />
      <Header />

      {/* Hero institucional (referencia visual) */}
      <div aria-hidden="true">
        <Hero />
      </div>

      <main className="bg-white">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500 mb-3">Fábrica directa</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{heroDescription}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold uppercase tracking-wide">Despacho a {city.name}</span>
              <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">Categoría: {product.category}</span>
              <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">Familia: {product.family}</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {uspCards.map((usp) => (
                <div key={usp.title} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <p className="text-sm font-bold text-gray-900 mb-2">{usp.title}</p>
                  <p className="text-sm text-gray-600">{usp.text}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Aplicación en {city.name}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Somos una fábrica basada en Bogotá con envíos directos a {city.name}. Atendemos empresas que requieren {product.shortTitle.toLowerCase()} con cumplimiento documental, bordado corporativo y entregas en lote. Operamos bajo pedidos mayoristas y proyectos licitatorios.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Especificaciones destacadas</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {product.features.slice(0, 6).map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <a
                    href={`https://wa.me/573000000000?text=Hola, quiero cotizar ${product.shortTitle} con despacho a ${city.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition shadow-lg shadow-green-600/20"
                  >
                    Cotizar por WhatsApp
                  </a>
                  <Link
                    href={`/productos/${product.slug}`}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    Ver ficha técnica
                  </Link>
                </div>
              </div>

              <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Checklist para despacho</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Lead time estimado: 24-72h según lote y personalización.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Transporte asegurado desde Bogotá hacia {city.name}.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Facturación electrónica y soporte de calidad por lote.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    Muestras rápidas cuando aplica el proyecto.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />

        {/* JSON-LD para SEO Local/Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>

      <Footer />
    </>
  );
}
