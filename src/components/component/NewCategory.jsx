import axios from 'axios'
import React, { useState } from 'react'

function NewCategory({setAddCategory, getTodos}) {
    const [category, setCategory] = useState('')
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    async function handleSubmit() {
        const updateCategory = await axios.post(`${backendUrl}/addcategory`,{
            newcategory: category
        }, {
            headers: {
                authorization: localStorage.getItem("authtoken")
            }
        })
        if(updateCategory.data.status === true){
            getTodos()
            setAddCategory(prev => !prev)
        } else{
            console.log(updateCategory.data.msg)
        }
    }
  return (
    <div className="flex items-center justify-center ml-[200%] md:ml-[75%] mt-[40vh] bg-gray-900 relative rounded-lg">
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div className="relative z-10 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
        <div onClick={() => setAddCategory(prev => !prev)} className='flex w-full font-lg cursor-pointer text-white justify-end'>x</div>
      <h2 className="text-xl font-semibold text-center text-white mb-4">Add Todo Category</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
        min={1}
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Category
        </button>
      </form>
    </div>
  </div>
  )
}

export default NewCategory