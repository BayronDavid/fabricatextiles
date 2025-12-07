import Link from 'next/link';

export default function TopBar() {
  return (
    <div id="topBar" className="bg-gray-900 text-gray-200 text-xs py-3 tracking-wide border-b border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
        <span className="font-medium top-urgent-text">🏭 Fábrica de Confección en Bogotá | Despachos a Nivel Nacional</span>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-gray-500">|</span>
          <Link href="#contacto" className="font-bold hover:text-white transition flex items-center gap-1">
            <span>Solicitar Cotización Mayorista</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
