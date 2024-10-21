import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const View = () => {
    const [recipe, setRecipe] = useState(null); // Renamed state variable for clarity
    const { id } = useParams();
    console.log( id );

    useEffect(()=>{
        if(sessionStorage.getItem("allRecipes")){
            const allRecipes=JSON.parse(sessionStorage.getItem("allRecipes"))
           setRecipe(allRecipes.find(item=>item.id==id))
        }
    },[])
    console.log(recipe);
    return (
        <>
            <Header />
            <div className='bg-gray-800 min-h-screen flex flex-col'>
                <div style={{ minHeight: '80vh' }} className='flex justify-center items-center mt-5'>
                        <div className='grid grid-cols-2 gap-8 items-center text-white'>
                            <img style={{ width: '100%', height: '400px' }} src={recipe?.image} alt="" />
                            <div>
                                <h3>ID:{recipe?.id}</h3>
                                <h1 className='text-3xl font-bold'>{recipe?.name}</h1>
                                <h4 className='font-bold text-red-500 text-xl'>{recipe?.cuisine}</h4>
                                <p><span className='font-bold'>Ingredients:</span> {recipe?.ingredients}</p>
                                <br />
                                <button style={{ marginLeft: '300px' }} className='bg-green-500 text-white p-2 rounded'>Order</button>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default View;
