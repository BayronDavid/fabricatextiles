"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center group">
          <h1 className="font-black text-gray-900 text-xl tracking-tight leading-none group-hover:text-gray-700 transition">CONFECCIONES<br/>EL ARTE</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium mt-1">Manufactura Textil</p>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
          <Link href="/#soluciones" className="hover:text-black transition">Nuestros Productos</Link>
          <Link href="/#capacidad" className="hover:text-black transition">Capacidad Instalada</Link>
          <Link href="/#contacto" className="hover:text-black transition">Contacto Empresas</Link>
          <Link href="/plan" className="hover:text-black transition text-gray-400">Plan SEO</Link>
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
              <Link href="/#soluciones" className="block py-2" onClick={() => setIsMenuOpen(false)}>Nuestros Productos</Link>
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
