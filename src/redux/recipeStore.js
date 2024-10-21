import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipeSlice";

const recipeStore = configureStore({
    reducer: {
        recipe: recipeSlice // Changed to a simpler name for clarity
    }
});

// Export the store
export default recipeStore;
