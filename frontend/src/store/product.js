import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  error: null,
  loading: false,
  creating: false,
  updating: false,
  deletingId: null,

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    set({
      loading: true,
      error: null,
    });

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
      set({ error: error.message || "Network error" });

      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      set({ loading: false });
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    set({ creating: true });

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return {
        success: true,
        message: "Product created successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      set({ creating: false });
    }
  },

  deleteProduct: async (id) => {
    set({ deletingId: id });

    try {
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
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      set({ deletingId: null });
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set({
      updating: true,
      error: null,
    });

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to update product",
        };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product,
        ),
        updating: false,
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      set({ updating: false });
    }
  },
}));
