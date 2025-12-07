import TopBar from '@/components/ui/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Servicio de Maquila Textil y Corte Industrial | El Arte',
  description: 'Servicio de maquila, corte y confección para marcas de ropa y licitaciones. Capacidad instalada para grandes volúmenes en Bogotá.',
  keywords: ['Servicio de corte textil', 'Maquila confección bogotá', 'Taller satélite costura', 'Terminación de prendas'],
};

export default function MaquilaPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white">
        <section className="bg-orange-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Servicios Industriales B2B
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Maquila Textil y <br/>Paquete Completo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Solución integral para marcas de moda, campañas políticas y licitaciones estatales.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                Ofrecemos servicios de <strong>corte, confección y terminación</strong> para terceros. Nuestra planta cuenta con mesas de corte industrial, máquinas planas, fileteadoras, collarines y presilladoras electrónicas.
              </p>
              <h3>Capacidades:</h3>
              <ul>
                <li>Corte automático y manual de alta precisión.</li>
                <li>Confección de tejido plano y de punto.</li>
                <li>Desarrollo de moldería y escalado.</li>
                <li>Empaque y etiquetado final.</li>
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
