import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchallRecipes } from '../redux/recipeSlice'


const Home = () => {

    const dispatch = useDispatch()
    const {allRecipes,loading,error}= useSelector(state=>state.recipe)   
    // console.log(allRecipes);
    const [CurrentPage,setCurrentPage]=useState(1)
    const recipePerPage =8
    const totalPage = Math.ceil(allRecipes?.length/recipePerPage)
    const currentPageLastRecipeIndex = CurrentPage * recipePerPage
    const currentPageStartRecipeIndex = currentPageLastRecipeIndex - recipePerPage
    const visibleRecipeCards = allRecipes?.slice(currentPageStartRecipeIndex,currentPageLastRecipeIndex)
    
    useEffect(()=>{
        dispatch(fetchallRecipes())
    },[])

    const navigateToNextPage =()=>{
      if(CurrentPage!=totalPage){
        setCurrentPage(CurrentPage+1)
      }
    }

    const navigateToPrevPage =()=>{
      if(CurrentPage!=1){
        setCurrentPage(CurrentPage-1)
      }
    }
   
  return (
    <>
    <Header insideHome={true}/>
    <div className='bg-gray-800 min-h-screen flex flex-col'>
     <div style={{marginTop:"80px"}} className='container text-white  mx-auto px'>
       {
        loading?
        <div className="flex justify-center items-center font-bold">
            Loading...
          </div>
          :
         <>
           <div className='grid grid-cols-4 gap-4'>
          {
              allRecipes.length>0 ?
              visibleRecipeCards?.map(recipes=>(
           <div key={recipes.id} className='rounded border p-2 shadow'>
               <img style={{width:'100%' }} src={recipes.image} alt="" />
               <div className='text-center'>
                  <h3 className='text-xl font-bold'>RId:{recipes.id}</h3>
                   <h3 className='text-xl font-bold'>Name:{recipes.name}</h3>
                   <h3 className='font-bold text-red-500 text-xl'>Cuisine:{recipes.cuisine}</h3><br />
                   <Link className='bg-blue-400 text-white p-1 inline-block rounded' to={`/${recipes.id}/view`}>About Dish</Link>
               </div>
           </div>
           ))
           :
           <div className="font-bold text-center mt-5 mb-5 text-red-600">
                  Recipie Not Found
                </div>
           }
           </div>
          {/* pagination */}
          <div className='flex justify-center items-center mt-5 mb-5'>
            <span onClick={navigateToPrevPage} style={{cursor:'pointer'}}><i className='fa-solid fa-backward me-5'></i></span>
            <span className='font-bold'>{CurrentPage} Of {totalPage}</span>
            <span onClick={navigateToNextPage} style={{cursor:'pointer'}}><i className='fa-solid fa-forward ms-5'></i></span>

          </div>
        
         </>
       }
     </div>
    </div>
    </>
     
  )
}

export default Home