"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const images = product.images || [];
  const [current, setCurrent] = useState(0);

  const hasSlides = images.length > 1;
  const next = () => setCurrent((idx) => (idx + 1) % images.length);
  const prev = () => setCurrent((idx) => (idx - 1 + images.length) % images.length);

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
      {images.length > 0 && (
        <div className="relative group mb-4 aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
          <Image
            src={images[current]}
            alt={`${product.title} - vista ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={current === 0}
            unoptimized
          />

          {hasSlides && (
            <>
              <button
                onClick={(e) => { e.preventDefault(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                aria-label="Imagen anterior"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button
                onClick={(e) => { e.preventDefault(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                aria-label="Imagen siguiente"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>

              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.preventDefault(); setCurrent(idx); }}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === current ? 'bg-gray-900' : 'bg-gray-300/80 hover:bg-gray-400'}`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-gray-500 font-bold">{product.category}</p>
          <p className="text-[11px] uppercase tracking-[0.12em] text-gray-400">{product.family}</p>
        </div>
        <span className="text-[11px] font-mono text-gray-500">{product.id}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {product.tags?.slice(0, 4).map((tag) => (
          <span key={tag} className="px-2 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/productos/${product.slug}`}
          className="text-sm font-semibold text-gray-900 hover:text-black"
        >
          Ver ficha
        </Link>
        <a
          href={`https://wa.me/573000000000?text=Hola, quiero cotizar: ${encodeURIComponent(product.title)}`}
          className="text-sm font-bold text-green-700 hover:text-green-800 flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
        </a>
      </div>
    </div>
  );
}
