import { create } from "zustand";

let latestFetchId = 0;

const readResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();

  return {
    success: false,
    message: text || "Unexpected server response",
  };
};

export const useProductStore = create((set) => ({
  products: [],
  error: null,
  loading: false,
  creating: false,
  deletingIds: new Set(),
  updatingIds: new Set(),

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    const fetchId = ++latestFetchId;

    set({
      loading: true,
      error: null,
    });

    try {
      const res = await fetch("/api/products");
      const data = await readResponse(res);

      if (!res.ok || !Array.isArray(data.data)) {
        throw new Error(data.message || "Invalid products response");
      }

      if (fetchId !== latestFetchId) {
        return;
      }

      set({
        products: data.data,
        error: null,
      });
    } catch (error) {
      if (fetchId !== latestFetchId) {
        return;
      }

      set({ error: error.message || "Network error" });

      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      if (fetchId === latestFetchId) {
        set({ loading: false });
      }
    }
  },

  createProduct: async (newProduct) => {
    if (
      !newProduct.name?.trim() ||
      typeof newProduct.price !== "number" ||
      !Number.isFinite(newProduct.price) ||
      newProduct.price < 0
    ) {
      return {
        success: false,
        message: "Please provide valid product data.",
      };
    }

    set({ creating: true });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await readResponse(res);

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
    set((state) => ({
      deletingIds: new Set([...state.deletingIds, id]),
    }));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await readResponse(res);

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
      set((state) => {
        const deletingIds = new Set(state.deletingIds);
        deletingIds.delete(id);

        return { deletingIds };
      });
    }
  },

  updateProduct: async (id, updatedProduct) => {
    set((state) => ({
      updatingIds: new Set([...state.updatingIds, id]),
      error: null,
    }));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await readResponse(res);

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
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error",
      };
    } finally {
      set((state) => {
        const updatingIds = new Set(state.updatingIds);
        updatingIds.delete(id);

        return { updatingIds };
      });
    }
  },
}));
