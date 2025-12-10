export default function ContactForm() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Inicie su Cotización</h2>
          <p className="text-gray-500">
            Atención directa a jefes de compras y gerentes. Respondemos en menos de 2 horas hábiles.
          </p>
        </div>

        <form className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Nombre del Encargado</label>
              <input type="text" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-black focus:ring-0 outline-none transition" placeholder="Ej: Carlos Rodríguez" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Empresa / Entidad</label>
              <input type="text" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-black focus:ring-0 outline-none transition" placeholder="Ej: Seguridad LTDA" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Celular o WhatsApp</label>
              <input type="tel" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-black focus:ring-0 outline-none transition" placeholder="Ej: 300 123 4567" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">Tipo de Dotación</label>
              <div className="relative">
                <select className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-black focus:ring-0 outline-none transition appearance-none">
                  <option>Uniformes de Seguridad</option>
                  <option>Dotación Industrial / Corporativa</option>
                  <option>Producción Masiva (Gorras/Eventos)</option>
                  <option>Servicio de Maquila / Corte</option>
                  <option>Otro requerimiento</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase">¿Qué prendas necesita cotizar?</label>
            <textarea rows="3" className="w-full bg-white border border-gray-300 p-4 rounded-xl focus:border-black focus:ring-0 outline-none transition" placeholder="Ej: 50 chalecos, 100 camisas tipo polo, fecha estimada de entrega..."></textarea>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white font-bold text-lg py-5 rounded-xl hover:bg-black hover:shadow-xl transition transform hover:-translate-y-1">
            ENVIAR SOLICITUD A FÁBRICA
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">
            Sus datos son tratados con confidencialidad empresarial.
          </p>
        </form>
      </div>
    </section>
  );
}