"use client";
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const groupedProducts = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return Array.from(map.entries());
  }, []);

  const openProducts = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsProductsOpen(true);
  };

  const closeProductsDelayed = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setIsProductsOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center group">
          <h1 className="font-black text-gray-900 text-xl tracking-tight leading-none group-hover:text-gray-700 transition">CONFECCIONES<br/>EL ARTE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium mt-1">Manufactura Textil</p>
        </Link>

        {/* Desktop Menu (minimal) */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-600 items-center">
          <div
            className="relative"
            onMouseEnter={openProducts}
            onMouseLeave={closeProductsDelayed}
          >
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              onFocus={openProducts}
              onBlur={closeProductsDelayed}
              className="flex items-center gap-2 hover:text-black transition font-semibold"
              aria-expanded={isProductsOpen}
            >
              Nuestros Productos
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <div
              role="menu"
              aria-hidden={!isProductsOpen}
              className={`absolute left-0 mt-3 w-[420px] bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-150 ${isProductsOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
              onFocus={openProducts}
              onBlur={closeProductsDelayed}
            >
              <div className="grid grid-cols-2 gap-4 p-4">
                {groupedProducts.map(([cat, items]) => (
                  <div key={cat} className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500 font-bold">{cat}</p>
                    <ul className="space-y-1">
                      {items.slice(0,3).map((p) => (
                        <li key={p.slug}>
                          <Link href={`/productos/${p.slug}`} className="block text-sm text-gray-700 hover:text-gray-900">{p.shortTitle}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 px-4 py-3 text-sm font-semibold">
                <Link href="/productos" className="text-gray-700 hover:text-gray-900">Ver catálogo completo</Link>
              </div>
            </div>
          </div>

          <Link href="/#capacidad" className="hover:text-black transition">Capacidad Instalada</Link>
          <Link href="/#contacto" className="hover:text-black transition">Contacto Empresas</Link>
        </nav>

        {/* CTA Button */}
        <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 hover:text-white transition duration-300">
          <span>WhatsApp Fábrica</span>
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute w-full left-0 top-20 shadow-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2 text-gray-700 font-semibold">
              <Link href="/productos" className="block py-2" onClick={() => setIsMenuOpen(false)}>Todos los Productos</Link>
              {/* List products grouped by categoría for quick access */}
              {groupedProducts.map(([cat, items]) => (
                <div key={cat} className="pt-1">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500 font-bold pl-2">{cat}</p>
                  {items.slice(0,3).map((p) => (
                    <Link key={p.slug} href={`/productos/${p.slug}`} className="block py-2 pl-4 text-sm text-gray-700" onClick={() => setIsMenuOpen(false)}>{p.shortTitle}</Link>
                  ))}
                </div>
              ))}
              <Link href="/#capacidad" className="block py-2" onClick={() => setIsMenuOpen(false)}>Capacidad Instalada</Link>
              <Link href="/#contacto" className="block py-2" onClick={() => setIsMenuOpen(false)}>Contacto Empresas</Link>
            </nav>
            <a href="https://wa.me/573000000000" className="mt-2 inline-flex items-center justify-center border-2 border-gray-900 text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition">WhatsApp Fábrica</a>
          </div>
        </div>
      )}
    </header>
  );
}
