'use client';

import { useState, useEffect, FormEvent } from 'react';
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

  function openCreate() {
    setEditId(null);
    setForm(emptyForm);
    setImageError(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-charcoal/40">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-charcoal text-white px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-tan rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-none" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                BagCorner
              </h1>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-white/60 hover:text-white text-sm transition-colors hidden sm:block"
            >
              View Store
            </a>
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: products.length, color: 'bg-charcoal' },
            { label: 'Active', value: products.filter((p) => p.isActive).length, color: 'bg-green-600' },
            { label: 'Inactive', value: products.filter((p) => !p.isActive).length, color: 'bg-red-400' },
            { label: 'Out of Stock', value: products.filter((p) => p.stock === 0).length, color: 'bg-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-border">
              <div className={`w-8 h-1 rounded-full ${stat.color} mb-3`} />
              <div className="text-2xl font-bold text-charcoal">{stat.value}</div>
              <div className="text-charcoal/50 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-charcoal">Products</h2>
          <button
            id="admin-add-product-btn"
            onClick={openCreate}
            className="flex items-center gap-2 bg-charcoal text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Products Table */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-16 text-center">
            <Package className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
            <p className="text-charcoal/40">No products yet. Add your first bag!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-cream/50">
                    <th className="text-left px-4 py-3 text-charcoal/50 font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-charcoal/50 font-medium hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 text-charcoal/50 font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-charcoal/50 font-medium hidden sm:table-cell">Stock</th>
                    <th className="text-left px-4 py-3 text-charcoal/50 font-medium">Status</th>
                    <th className="text-right px-4 py-3 text-charcoal/50 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-cream/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-border">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <ImageOff className="w-5 h-5 text-charcoal/20" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-charcoal line-clamp-1">{product.name}</div>
                            <div className="text-charcoal/40 text-xs line-clamp-1 hidden sm:block">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-charcoal/60">{product.category || '—'}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-charcoal">
                        ₹{product.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`text-xs font-medium ${
                          product.stock === 0
                            ? 'text-red-500'
                            : product.stock !== undefined
                            ? 'text-green-600'
                            : 'text-charcoal/40'
                        }`}>
                          {product.stock === 0 ? 'Out' : product.stock !== undefined ? product.stock : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(product)}
                          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                          title={product.isActive ? 'Click to deactivate' : 'Click to activate'}
                        >
                          {product.isActive ? (
                            <>
                              <ToggleRight className="w-5 h-5 text-green-500" />
                              <span className="text-green-600 hidden sm:inline">Active</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-5 h-5 text-charcoal/30" />
                              <span className="text-charcoal/40 hidden sm:inline">Inactive</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 rounded-lg hover:bg-cream text-charcoal/50 hover:text-charcoal transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(product._id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-charcoal/50 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

                <div>
                  <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                    Image URL *
                  </label>
                  <input
                    id="product-image-url-input"
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImageError(false); }}
                    required
                    placeholder="https://example.com/bag.jpg"
                    className="w-full px-4 py-2.5 bg-cream border border-border rounded-xl text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-tan/40 focus:border-tan transition-all text-sm"
                  />
                  <p className="text-xs text-charcoal/40 mt-1">Paste an image URL from the web</p>
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
