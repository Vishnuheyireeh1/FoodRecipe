import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchRecipe } from '../redux/recipeSlice'


const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  return (
    <nav className='flex w-full bg-red-500 fixed top-0 p-3 items-center'>
        <Link className='text-white font-semibold' to={'/'}><i className="fa-solid fa-utensils me-1"></i>Arabian Grills</Link>
        <div style={{marginLeft:'800px'}}>
            { insideHome && <input type="text" onChange={e=>dispatch(searchRecipe(e.target.value.toLowerCase()))} style={{width:'300px'}} className='rounded p-1' placeholder='Search Product' /> }
        </div>
    </nav>

    
  )
}

export default Header