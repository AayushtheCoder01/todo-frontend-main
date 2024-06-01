import React from 'react'
import { NavLink } from 'react-router-dom';
import './components.css'
function Category({Category, index}) {
    
  return (
    <NavLink to={`/category/${Category}`} className={({ isActive }) =>
        isActive ? 'text-blue-500' : 'text-white'
      }
      
>
        <div className={`my-3 category-card w-full h-[auto] md:h-[auto] m-1 p-2 px-10 py-3 md:py-7 rounded-xl`}>
        <div className='flex h-full w-full justify-center items-center text-md md:text-2xl category-card-title'>{Category}</div>
    </div>
    </NavLink>
    
  )
}

export default Category