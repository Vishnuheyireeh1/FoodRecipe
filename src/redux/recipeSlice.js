import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchallRecipes=createAsyncThunk("recipes/fetchallRecipes",async()=>{
    const result=await axios.get("https://dummyjson.com/recipes")

    sessionStorage.setItem("allRecipes",JSON.stringify(result.data.recipes))
    return result.data.recipes

})
const recipeSlice=createSlice({
    name:'recipes',
    initialState: {
        allRecipes:[],
        dummyallRecipes:[],
        loading:false,
        error:""
        
    },
    reducers:{
        searchRecipe:(state,actionFromHeader)=>{
            state.allRecipes=state.dummyallRecipes.filter(item=>item.cuisine.toLowerCase().includes
        (actionFromHeader.payload))
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchallRecipes.fulfilled,(state,apiResult)=>{
            state.allRecipes=apiResult.payload
            state.dummyallRecipes=apiResult.payload
            state.loading=false
            state.error=""
        })
        builder.addCase(fetchallRecipes.pending,(state,apiResult)=>{
            state.allRecipes=[]
            state.dummyallRecipes=[]
            state.loading=true
            state.error=""
        })
        builder.addCase(fetchallRecipes.rejected,(state,apiResult)=>{
            state.allRecipes=[]
            state.dummyallRecipes=[]
            state.loading=false
            state.error="Please try after Sometimes"
        })
    }
})

export const{searchRecipe} = recipeSlice.actions 
export default recipeSlice.reducer