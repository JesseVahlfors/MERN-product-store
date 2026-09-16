import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  error: null,

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      set({
        products: data.data,
        error: null,
      });
    } catch (error) {
      set({
        error: error.message,
      });
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to create product",
      };
    }

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: "Product created successfully" };
  },

  deleteProduct: async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete product",
      };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));

    return { success: true, message: "Product deleted successfully" };
  },
}));
