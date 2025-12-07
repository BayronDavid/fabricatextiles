"use client";
import { useMemo } from "react";

export default function ProductFilters({ categories, families, filters, onChange }) {
  const categoryOptions = useMemo(() => [{ value: "all", label: "Todas" }, ...categories.map((c) => ({ value: c, label: c }))], [categories]);
  const familyOptions = useMemo(() => [{ value: "all", label: "Todas" }, ...families.map((f) => ({ value: f, label: f }))], [families]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-[0.08em]">Buscar</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Ej: chaleco, gorra, impermeable"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-[0.08em]">Categoría</label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-[0.08em]">Familia / Tipo</label>
          <select
            value={filters.family}
            onChange={(e) => onChange({ ...filters, family: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {familyOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-[0.08em]">Tags</label>
          <input
            type="text"
            value={filters.tag}
            onChange={(e) => onChange({ ...filters, tag: e.target.value })}
            placeholder="Ej: reflectivo, bordado"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          className="text-xs font-bold px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
          onClick={() => onChange({ search: "", category: "all", family: "all", tag: "" })}
        >
          Limpiar filtros
        </button>
        <span className="text-xs text-gray-500">Sin precios: cotización personalizada por WhatsApp.</span>
      </div>
    </div>
  );
}
