import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { records: [], cart: [] };

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    pluseItem: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id
      );
      item.quantity += 1;
    },
    minasItem: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id
      );
      item.quantity -= 1;
      if (item.quantity < 1) {
        state.cart = state.cart.filter((el) => el.id !== action.payload.id);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((el) => el.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.records = action.payload;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        const productIndex = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        if (productIndex > -1) {
          state.cart[productIndex].quantity += 1;
        } else {
          const cartClone = { ...action.payload };
          cartClone.quantity = 1;
          state.cart.push(cartClone);
        }
      });
  },
});
export const { pluseItem, minasItem, removeItem, clearCart } =
  productSlice.actions;
export default productSlice.reducer;
