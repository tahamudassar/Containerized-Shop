// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold items added to the cart
  itemCount: 0,
  total: 0, // Add total property to the initial state
  loggedIn: false, // Add loggedIn property to the initial state
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // Add new item directly to the items array
      state.itemCount += 1; // Increment item count
      state.total = parseFloat((state.total + action.payload.price).toFixed(2)); // Add item price to total and round to 2 decimal places
    },

    removeFromCart: (state, action) => {
      const { id, forceZeroQuantity } = action.payload; // Destructure id and forceZeroQuantity from the payload
      if (forceZeroQuantity) {
        const itemsToRemove = state.items.filter(item => item.id === id);
        state.total = parseFloat((state.total - itemsToRemove.reduce((sum, item) => sum + item.price, 0)).toFixed(2)); // Subtract total price of removed items and round to 2 decimal places
        state.itemCount -= itemsToRemove.length; // Decrement item count by the number of items removed
        state.items = state.items.filter(item => item.id !== id); // Remove all items with the given id
      } else {
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.total = parseFloat((state.total - state.items[index].price).toFixed(2)); // Subtract item price from total and round to 2 decimal places
          state.items.splice(index, 1); // Remove one instance of the item with the given id
          state.itemCount -= 1; // Decrement item count by one
        }
      }
      if (state.itemCount < 0) {
        state.itemCount = 0; // Prevent negative item count
      }
    },

    resetCart: (state) => {
      state.items = [];
      state.itemCount = 0; // Reset the cart and item count
      state.total = 0; // Reset the total
    },
    
    decreaseQuantity: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.total = parseFloat((state.total - state.items[index].price).toFixed(2)); // Subtract item price from total and round to 2 decimal places
        state.items = state.items.filter((_, i) => i !== index); // Remove one instance of the item with the given id
        state.itemCount -= 1; // Decrement item count
        if (state.itemCount < 0) {
          state.itemCount = 0; // Prevent negative item count
        }
      }
    },
    setLoggedIn: (state, action) => {
      // console.log("this is logged in",state.loggedIn);

      state.loggedIn = action.payload; // Set loggedIn state
    },
    logout: (state) => {
      cartSlice.caseReducers.setLoggedIn(state, { payload: false }); // Use setLoggedIn to set loggedIn to false
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, resetCart, decreaseQuantity, setLoggedIn, logout } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
