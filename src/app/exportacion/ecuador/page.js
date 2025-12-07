import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Maquila y Dotaciones Textiles Colombia para Ecuador',
  description: 'Exportación de uniformes y dotaciones desde Colombia hacia Ecuador. Calidad de exportación, precios competitivos y logística simplificada.',
  keywords: ['Importar uniformes colombia', 'fábrica textil quito', 'dotaciones guayaquil precios'],
};

export default function EcuadorPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white">
        <section className="bg-teal-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Exportación
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Dotaciones Colombianas <br/>para el Mercado Ecuatoriano
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Aproveche la tasa de cambio y la calidad textil colombiana. Envíos a Quito, Guayaquil y Cuenca.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                Somos expertos en la exportación de textiles hacia Ecuador. Manejamos toda la documentación necesaria para facilitar el proceso de aduanas y asegurar que su mercancía llegue a tiempo.
              </p>
              <h3>Beneficios para empresas en Ecuador:</h3>
              <ul>
                <li>Telas con tecnología Lafayet y Fabricato.</li>
                <li>Confección de alta durabilidad.</li>
                <li>Precios competitivos en dólares.</li>
              </ul>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
