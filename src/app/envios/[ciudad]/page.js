import { cities } from '@/data/cities';
import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ui/ContactForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return cities.map((city) => ({
    ciudad: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);

  if (!city) {
    return {
      title: 'Ciudad no encontrada',
    };
  }

  return {
    title: city.title,
    description: city.description,
    keywords: city.keywords,
    openGraph: {
      title: city.title,
      description: city.description,
    },
  };
}

export default async function CityPage({ params }) {
  const { ciudad } = await params;
  const city = cities.find((c) => c.slug === ciudad);

  if (!city) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city.title,
    description: city.description,
    areaServed: {
      '@type': 'City',
      name: city.name
    },
    provider: {
      '@type': 'Organization',
      name: 'Confecciones El Arte'
    }
  };

  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white">
        {/* Hero Local */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-blue-900 text-blue-100 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider border border-blue-700">
              Cobertura Nacional
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-6">
              Fábrica de Dotaciones con <br/>
              <span className="text-blue-400">Envío Directo a {city.name}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {city.description} Sin intermediarios, directo desde nuestra planta en Bogotá.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#contacto" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                Solicitar Cotización para {city.name}
              </a>
            </div>
          </div>
        </section>

        {/* Contenido SEO Local */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg mx-auto text-gray-600">
              <h2 className="text-gray-900 font-bold">¿Por qué elegirnos como su proveedor en {city.name}?</h2>
              <p>
                Sabemos que encontrar un proveedor confiable de <strong>dotaciones en {city.name}</strong> puede ser un reto. Muchos distribuidores locales simplemente revenden productos con sobrecostos.
              </p>
              <p>
                En <strong>Confecciones El Arte</strong>, eliminamos al intermediario. Fabricamos en nuestra planta central y despachamos diariamente a {city.name} a través de nuestras alianzas logísticas (Servientrega, Interrapidísimo, Encoexpress), garantizando tiempos de entrega récord y precios de fábrica.
              </p>
              
              <h3 className="text-gray-900 font-bold mt-8">Nuestros productos más solicitados en {city.name}</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Uniformes de seguridad privada (vigilancia).</li>
                <li>Chalecos industriales y corporativos con bordado.</li>
                <li>Ropa de trabajo pesado (overoles, petos).</li>
                <li>Dotación impermeable para motorizados.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
