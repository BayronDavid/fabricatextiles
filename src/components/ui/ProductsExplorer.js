"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function ProductsExplorer({ products }) {
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const families = useMemo(() => {
    const set = new Set(products.map((p) => p.family));
    return Array.from(set);
  }, [products]);

  const [filters, setFilters] = useState({ search: "", category: "all", family: "all", tag: "" });

  const filtered = useMemo(() => {
    const term = filters.search.toLowerCase();
    const tagTerm = filters.tag.toLowerCase();
    return products.filter((p) => {
      const byCategory = filters.category === "all" || p.category === filters.category;
      const byFamily = filters.family === "all" || p.family === filters.family;
      const bySearch = !term || [p.title, p.description, ...(p.tags || []), ...(p.keywords || [])].some((field) => field.toLowerCase().includes(term));
      const byTag = !tagTerm || (p.tags || []).some((t) => t.toLowerCase().includes(tagTerm));
      return byCategory && byFamily && bySearch && byTag;
    });
  }, [products, filters]);

  const featured = useMemo(() => filtered.filter((p) => p.featured), [filtered]);

  const groupedByCategory = useMemo(() => {
    const map = new Map();
    filtered.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <section className="space-y-10">
      <ProductFilters categories={categories} families={families} filters={filters} onChange={setFilters} />

      {featured.length > 0 && (
        <div id="destacados" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] bg-gray-900 text-white rounded-full">Destacados</span>
            <p className="text-sm text-gray-600">Productos de mayor rotación y búsqueda</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      {groupedByCategory.map(([cat, items]) => (
        <div key={cat} id={slugify(cat)} className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] bg-gray-100 text-gray-800 rounded-full border border-gray-200">{cat}</span>
            <p className="text-sm text-gray-600">{items.length} referencia(s)</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 text-sm">
          No encontramos productos con esos filtros. Ajusta búsqueda o categoría.
        </div>
      )}
    </section>
  );
}
