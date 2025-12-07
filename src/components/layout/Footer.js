import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-black text-gray-900 text-lg leading-none mb-2">CONFECCIONES<br/>EL ARTE</h4>
          <p className="text-gray-500 text-sm">Bogotá D.C., Colombia</p>
        </div>
        
        <div className="text-sm text-gray-500 text-center md:text-right">
          <p className="mb-1">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          <div className="flex gap-4 justify-center md:justify-end text-xs font-bold text-gray-400">
            <Link href="/productos/goleanas-legionario" className="hover:text-black">Goleanas</Link>
            <Link href="/productos/chalecos-vigilancia" className="hover:text-black">Chalecos</Link>
            <Link href="/servicios/maquila-textil" className="hover:text-black">Maquila</Link>
            <Link href="/sitemap.xml" className="hover:text-black">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
