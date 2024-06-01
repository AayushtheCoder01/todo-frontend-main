import React, { useState } from 'react'
import './components.css'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { userDataAtom } from './Store/store'

function AddTodo({setAddTodo, getTodos}) {
    const userData = useRecoilValue(userDataAtom)
    const options = userData.userData.usercategory
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        category: options[0]
    })

    async function creatTodo(e) {
        e.preventDefault()
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            const createTodo = await axios.post(`${backendUrl}/createtodo`, {
                title: todo.title,
                description: todo.description,
                category: todo.category,
            }, {
                headers: {
                    authorization: localStorage.getItem("authtoken")
                }
            })
            console.log(createTodo)
            if(createTodo.data.status === true) {
                console.log("todo created.")
                getTodos()
                setAddTodo(false)
            }
        } catch (error) {
            console.log(error.response.data.msg)
        }
    
    }
  return (

        <div className='flex flex-col add-card mr-5 justify-center items-center md:h-[55vh] md:w-[40vw] inner-shadow bg-white dark:bg-slate-900 rounded-xl p-4'>
        <div className='flex w-[100%] justify-end'>
            <button onClick={() => setAddTodo(false)} className='dark:text-white text-black text-lg mr-[2vw]'>x</button>
        </div>
        <form>
            <input onChange={(e) => setTodo({...todo, title: e.target.value})} placeholder='Todo title' min={2} className='my-2 w-[100%] dark:text-white text-black h-[6vh] px-2 rounded-lg bg-zinc-700 p-1'/>
            <textarea onChange={(e) => setTodo({...todo, description: e.target.value})} placeholder='Description (optional)' className='p-1 px-2 my-2 dark:text-white text-black w-[100%] bg-zinc-700 rounded-lg'/>
            <select onChange={(e) => setTodo({...todo, category: e.target.value})} className="className='p-2 px-2 my-2 w-[100%] h-[6vh] text-zinc-200  bg-zinc-700 rounded-lg">
                {options.map(item => (
                    <option key={item} value={item}>
                    {item}
                    </option>
                ))}
                </select>
                <div className='flex w-[100%] justify-center'>
                    <button onClick={(e) => creatTodo(e)} className='btn mt-5 p-1 w-[11vw] h-[6vh] rounded-md'>Add</button>
                </div>
        </form>
    </div>
    
  )
}

export default AddTodo