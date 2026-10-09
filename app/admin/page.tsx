'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  X,
  Check,
  Package,
  ToggleLeft,
  ToggleRight,
  ImageOff,
  Upload,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
  stock?: number;
  isActive: boolean;
}

interface FormState {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  category: string;
  stock: string;
  isActive: boolean;
}

const emptyForm: FormState = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  category: '',
  stock: '',
  isActive: true,
};

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products?all=true');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Upload failed'); return; }
      setForm(prev => ({ ...prev, imageUrl: data.url }));
      setImageError(false);
    } catch {
      setError('Upload failed. Check your connection.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function openCreate() {
    setEditId(null);
    setForm(emptyForm);
    setImageError(false);
    setImageTab('upload');
    setShowForm(true);
    setError('');
  }

  function openEdit(product: Product) {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      category: product.category || '',
      stock: product.stock !== undefined ? String(product.stock) : '',
      isActive: product.isActive,
    });
    setImageError(false);
    setImageTab('url');
    setShowForm(true);
    setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      imageUrl: form.imageUrl,
      category: form.category || undefined,
      stock: form.stock !== '' ? Number(form.stock) : undefined,
      isActive: form.isActive,
    };

    try {
      const url = editId ? `/api/products/${editId}` : '/api/products';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
        return;
      }
      await fetchProducts();
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setDeleteId(null);
      }
    } catch {
      setError('Delete failed');
    }
  }

  async function toggleActive(product: Product) {
    try {
      await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, isActive: !p.isActive } : p))
      );
    } catch {
      setError('Update failed');
    }
  }

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[]];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex items-center gap-3 text-charcoal/60 font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-tan" />
          <span>Loading Admin Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal antialiased">
      {/* Header */}
      <header className="bg-charcoal text-white px-4 sm:px-8 py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-tan rounded-xl flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-tight tracking-tight" style={{ fontFamily: 'var(--font-playfair-loaded), serif' }}>
                BagCorner
              </h1>
              <p className="text-white/50 text-xs font-medium">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden sm:flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-lg border border-white/10"
            >
              <span>View Store</span>
            </a>
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 hover:text-white px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all border border-rose-500/30"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: products.length, badge: 'All items', accent: 'bg-charcoal text-white' },
            { label: 'Active', value: products.filter((p) => p.isActive).length, badge: 'Live in store', accent: 'bg-emerald-600 text-white' },
            { label: 'Inactive', value: products.filter((p) => !p.isActive).length, badge: 'Hidden', accent: 'bg-rose-500 text-white' },
            { label: 'Out of Stock', value: products.filter((p) => p.stock === 0).length, badge: 'Stock Alert', accent: 'bg-amber-500 text-white' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-charcoal/60 tracking-wide">{stat.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.accent}`}>
                  {stat.badge}
                </span>
              </div>
              <div className="text-3xl font-black text-charcoal tracking-tight leading-none mb-1">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-charcoal tracking-tight">Products</h2>
            <span className="bg-tan/15 text-tan font-bold px-2.5 py-1 rounded-full text-xs border border-tan/30">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-border rounded-xl text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-tan/40 w-full sm:w-60 shadow-xs"
            />

            {/* Add Product Button */}
            <button
              id="admin-add-product-btn"
              onClick={openCreate}
              className="flex items-center justify-center gap-2 bg-charcoal text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-dark transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-rose-400 hover:text-rose-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Products Table */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-16 text-center shadow-xs">
            <Package className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-charcoal mb-1">No products found</h3>
            <p className="text-charcoal/50 text-sm max-w-sm mx-auto">
              {searchQuery ? 'Try clearing your search query to see all items.' : 'Click "Add Product" above to create your first item!'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-cream/60">
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[260px]">Product</th>
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[120px] hidden md:table-cell">Category</th>
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[100px] whitespace-nowrap">Price</th>
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[100px] whitespace-nowrap hidden sm:table-cell">Stock Status</th>
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[100px] whitespace-nowrap">Status</th>
                    <th className="px-5 py-3.5 text-xs font-bold text-charcoal/60 uppercase tracking-wider min-w-[100px] whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredProducts.map((product) => {
                    const isImgFailed = failedImages[product._id];
                    const imgUrl = isImgFailed ? '/p1.png' : product.imageUrl || '/p1.png';

                    return (
                      <tr key={product._id} className="hover:bg-cream/40 transition-colors">
                        <td className="px-5 py-4 min-w-[260px]">
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-border shadow-2xs">
                              <Image
                                src={imgUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                                onError={() => setFailedImages(prev => ({ ...prev, [product._id]: true }))}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-charcoal line-clamp-1 text-sm">{product.name}</div>
                              <div className="text-charcoal/50 text-xs line-clamp-1 hidden sm:block mt-0.5">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell min-w-[120px]">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-cream text-charcoal/70 border border-border/70">
                            {product.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-bold text-charcoal text-base whitespace-nowrap min-w-[100px]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell whitespace-nowrap min-w-[100px]">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            product.stock === 0
                              ? 'bg-rose-100 text-rose-700'
                              : product.stock !== undefined
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-cream text-charcoal/50'
                          }`}>
                            {product.stock === 0 ? 'Out of stock' : product.stock !== undefined ? `${product.stock} in stock` : 'Unlimited'}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap min-w-[100px]">
                          <button
                            onClick={() => toggleActive(product)}
                            className="flex items-center gap-2 text-xs font-bold transition-all focus:outline-none"
                            title={product.isActive ? 'Click to deactivate' : 'Click to activate'}
                          >
                            {product.isActive ? (
                              <>
                                <ToggleRight className="w-6 h-6 text-emerald-600" />
                                <span className="text-emerald-700 hidden sm:inline">Active</span>
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-6 h-6 text-charcoal/30" />
                                <span className="text-charcoal/40 hidden sm:inline">Inactive</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right min-w-[100px]">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEdit(product)}
                              className="p-2 rounded-lg hover:bg-cream text-charcoal/60 hover:text-charcoal transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteId(product._id)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-charcoal/60 hover:text-rose-600 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-charcoal">
                {editId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-xl hover:bg-cream text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Image preview */}
              {form.imageUrl && !imageError && (
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-cream border border-border">
                  <Image
                    src={form.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="500px"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    id="product-name-input"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Classic Leather Backpack"
                    className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                      Price (₹) *
                    </label>
                    <input
                      id="product-price-input"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                      placeholder="1499"
                      className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                      Stock
                    </label>
                    <input
                      id="product-stock-input"
                      type="number"
                      min="0"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      placeholder="10"
                      className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                    Description *
                  </label>
                  <textarea
                    id="product-description-input"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    placeholder="A beautiful and functional bag..."
                    rows={3}
                    className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm resize-none"
                  />
                </div>

                {/* Image — Upload or URL */}
                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                    Product Image *
                  </label>

                  {/* Tab switcher */}
                  <div className="flex rounded-xl overflow-hidden border border-border mb-3">
                    <button
                      type="button"
                      onClick={() => setImageTab('upload')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-colors ${
                        imageTab === 'upload'
                          ? 'bg-charcoal text-white'
                          : 'bg-cream text-charcoal/50 hover:text-charcoal'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageTab('url')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-colors ${
                        imageTab === 'url'
                          ? 'bg-charcoal text-white'
                          : 'bg-cream text-charcoal/50 hover:text-charcoal'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      Paste URL
                    </button>
                  </div>

                  {imageTab === 'upload' ? (
                    <div
                      onClick={() => !uploading && fileInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                        uploading
                          ? 'border-tan/40 bg-tan/5 cursor-wait'
                          : 'border-border hover:border-tan hover:bg-tan/5'
                      }`}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-6 h-6 text-tan animate-spin" />
                          <p className="text-xs text-charcoal/50">Uploading…</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-charcoal/30" />
                          <p className="text-xs text-charcoal/50 text-center">
                            Click to upload image<br />
                            <span className="text-charcoal/30">JPEG, PNG, WebP · max 5 MB</span>
                          </p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        id="product-image-file-input"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <input
                      id="product-image-url-input"
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImageError(false); }}
                      placeholder="https://example.com/bag.jpg"
                      className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                    />
                  )}

                  {/* Hidden required input to ensure imageUrl is always validated */}
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={() => {}}
                    required
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  />

                  {form.imageUrl && (
                    <p className="text-xs text-green-600 mt-1 truncate">✓ {form.imageUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                    Category
                  </label>
                  <input
                    id="product-category-input"
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Backpacks, Tote Bags..."
                    className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-cream rounded-xl border border-border">
                  <div>
                    <div className="text-sm font-medium text-charcoal">Active / Visible</div>
                    <div className="text-xs text-charcoal/50">Show this product in the store</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className="flex items-center gap-2 transition-colors"
                  >
                    {form.isActive ? (
                      <ToggleRight className="w-8 h-8 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-charcoal/30" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-charcoal text-sm font-medium hover:bg-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="product-save-btn"
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-charcoal text-white py-3 rounded-xl text-sm font-semibold hover:bg-dark transition-colors disabled:opacity-60"
                >
                  <Check className="w-4 h-4" />
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-charcoal mb-2">Delete Product?</h3>
            <p className="text-charcoal/60 text-sm mb-6">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-border text-charcoal text-sm font-medium hover:bg-cream transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
