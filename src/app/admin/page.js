'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { getLocalImages, saveProducts } from '@/app/actions';
import { products as initialProducts } from '@/data/products';

const inputClasses = 'w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

const createEmptyProduct = () => ({
  id: `NEW-${Date.now()}`,
  slug: '',
  title: '',
  shortTitle: '',
  category: '',
  family: '',
  segment: '',
  description: '',
  features: [],
  tags: [],
  keywords: [],
  images: [],
  featured: false,
  isNew: true,
});

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function AdminPage() {
  const [products, setProducts] = useState(() =>
    initialProducts.map((product) => ({
      ...product,
      images: Array.isArray(product.images) ? [...product.images] : [],
      isNew: false,
    }))
  );
  const [selectedId, setSelectedId] = useState(initialProducts[0]?.id ?? null);
  const [availableImages, setAvailableImages] = useState([]);
  const [isSaving, startSaving] = useTransition();
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === selectedId) ?? null,
    [products, selectedId]
  );

  useEffect(() => {
    const loadImages = async () => {
      setIsLoadingImages(true);
      try {
        const images = await getLocalImages();
        setAvailableImages(images);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImages();
  }, []);

  const updateProductField = (field, value) => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedId ? { ...product, [field]: value } : product
      )
    );

    if (field === 'title' && selectedProduct?.isNew) {
      const maybeSlug = slugify(value);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedId
            ? {
                ...product,
                slug: product.slug || maybeSlug,
              }
            : product
        )
      );
    }
  };

  const addImageToProduct = (imagePath) => {
    if (!selectedProduct || !imagePath) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedId
          ? {
              ...product,
              images: product.images?.includes(imagePath)
                ? product.images
                : [...(product.images ?? []), imagePath],
            }
          : product
      )
    );
  };

  const removeImageFromProduct = (imagePath) => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedId
          ? {
              ...product,
              images: (product.images ?? []).filter((img) => img !== imagePath),
            }
          : product
      )
    );
  };

  const moveImage = (imagePath, direction) => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== selectedId) return product;
        const currentImages = product.images ?? [];
        const index = currentImages.findIndex((img) => img === imagePath);
        if (index === -1) return product;
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= currentImages.length) return product;

        const reordered = [...currentImages];
        const [removed] = reordered.splice(index, 1);
        reordered.splice(targetIndex, 0, removed);
        return { ...product, images: reordered };
      })
    );
  };

  const handleSave = () => {
    startSaving(async () => {
      await saveProducts(products);
    });
  };

  const handleCreateProduct = () => {
    const newProduct = createEmptyProduct();
    setProducts((prev) => [...prev, newProduct]);
    setSelectedId(newProduct.id);
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-md">
          <h1 className="text-xl font-semibold text-gray-800">Panel de productos</h1>
          <p className="mt-4 text-gray-600">No hay productos para editar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Admin</p>
            <h1 className="text-2xl font-bold text-gray-900">Editor de productos</h1>
            <p className="text-sm text-gray-600">Gestiona títulos, descripciones e imágenes desde el almacenamiento local.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCreateProduct}
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-900"
            >
              + Nuevo producto
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <aside className="md:col-span-1">
            <div className="rounded-xl bg-white p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">Productos</h2>
                <span className="text-xs text-gray-500">{products.length} items</span>
              </div>
              <div className="mt-3 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                      selectedId === product.id
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                        : 'border-gray-200 bg-white text-gray-800 hover:border-indigo-300'
                    }`}
                  >
                    <p className="font-semibold">{product.shortTitle || product.title}</p>
                    <p className="text-xs text-gray-500">{product.family} · {product.segment}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="md:col-span-2">
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Título</label>
                  <input
                    className={`${inputClasses} mt-1`}
                    value={selectedProduct.title || ''}
                    onChange={(e) => updateProductField('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Título corto</label>
                  <input
                    className={`${inputClasses} mt-1`}
                    value={selectedProduct.shortTitle || ''}
                    onChange={(e) => updateProductField('shortTitle', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Descripción</label>
                <textarea
                  rows={3}
                  className={`${inputClasses} mt-1`}
                  value={selectedProduct.description || ''}
                  onChange={(e) => updateProductField('description', e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Slug</label>
                  <input
                    className={`${inputClasses} mt-1 ${selectedProduct.isNew ? '' : 'bg-gray-100 text-gray-500'}`}
                    value={selectedProduct.slug || ''}
                    onChange={(e) => updateProductField('slug', slugify(e.target.value))}
                    readOnly={!selectedProduct.isNew}
                    disabled={!selectedProduct.isNew}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Categoría</label>
                  <input
                    className={`${inputClasses} mt-1`}
                    value={selectedProduct.category || ''}
                    onChange={(e) => updateProductField('category', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Familia</label>
                  <input
                    className={`${inputClasses} mt-1`}
                    value={selectedProduct.family || ''}
                    onChange={(e) => updateProductField('family', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Imágenes</label>
                  {isLoadingImages ? (
                    <span className="text-xs text-gray-500">Cargando imágenes...</span>
                  ) : (
                    <span className="text-xs text-gray-500">{availableImages.length} disponibles</span>
                  )}
                </div>

                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {(selectedProduct.images ?? []).length === 0 && (
                    <p className="text-sm text-gray-500">Aún no hay imágenes asociadas.</p>
                  )}
                  {(selectedProduct.images ?? []).map((imagePath) => (
                    <div key={imagePath} className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <img
                        src={imagePath}
                        alt={selectedProduct.shortTitle || selectedProduct.title}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageFromProduct(imagePath)}
                        className="absolute right-1 top-1 rounded-full bg-white/80 px-2 text-xs font-bold text-gray-700 shadow hover:bg-white"
                        aria-label="Eliminar imagen"
                      >
                        ×
                      </button>
                      <div className="absolute left-1 bottom-1 flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveImage(imagePath, -1)}
                          className="rounded bg-white/85 px-2 text-[11px] font-semibold text-gray-700 shadow hover:bg-white"
                          aria-label="Mover imagen hacia arriba"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(imagePath, 1)}
                          className="rounded bg-white/85 px-2 text-[11px] font-semibold text-gray-700 shadow hover:bg-white"
                          aria-label="Mover imagen hacia abajo"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-600">Biblioteca local</label>
                      <span className="text-[11px] text-gray-500">Click para agregar al producto</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {availableImages.map((image) => (
                        <button
                          key={image.path}
                          type="button"
                          onClick={() => addImageToProduct(image.path)}
                          className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="h-24 w-full bg-gray-50">
                            <img
                              src={image.path}
                              alt={image.directory}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between px-2 py-1">
                            <p className="truncate text-[11px] font-medium text-gray-700">{image.category || 'Sin categoría'}</p>
                            {image.favorite && <span className="text-[11px] text-amber-500">★</span>}
                          </div>
                          <p className="px-2 pb-2 text-[10px] text-gray-500">{image.path}</p>
                        </button>
                      ))}
                      {availableImages.length === 0 && (
                        <p className="col-span-full text-sm text-gray-500">No hay imágenes en /public/productos.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
