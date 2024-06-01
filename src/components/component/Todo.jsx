import React, { useState } from 'react'
import "./components.css"
import { SlCalender } from "react-icons/sl";
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";

function Todo({todo, getTodos}) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    let date = new Date(todo.date)
    let nd = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const [completed, setCompleted] = useState(todo.completed)
    const [isHovered, setIsHovered] = useState(false)

    async function updateTodo() {
      const updatedtodo = await axios.put(`${backendUrl}/updatetodo`,{
        title: todo.title,
        description: todo.description,
        category: todo.category,
        completed: (!completed),
        todoId: todo._id,
      }, {
        headers: {
          authorization: localStorage.getItem("authtoken")
        }
      })
    }

    async function deleteTodo() {
      try {
        const deletedtodo = await axios.post(`${backendUrl}/deletetodo`,{
          todoId: todo._id,
        }, {
          headers: {
            authorization: localStorage.getItem("authtoken")
          }
        })
        
        if(deletedtodo.data.status === true) {
          getTodos()
        }
      } catch (error) {
        console.log(error)
      }
      
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <>

    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='card md:[auto] w-85 rounded-md md:w-[21vw] m-3 p-2 px-5'>
        <div className='flex w-full justify-between card-title mb-3 justify-center my-1'><h3>{todo.title}</h3> {isHovered? <span className='cursor-pointer' onClick={() => deleteTodo()}><RiDeleteBin6Line color='orange'/></span> : null} </div>
        <div className='flex w-full justify-start my-1'><h3><span className='card-text'></span> {todo.description}</h3></div>
        <div className='flex w-full justify-start my-1'><h3><span className='card-text'>Category:</span> {todo.category}</h3></div>
        <div className='flex w-full iinline justify-start my-1'><h3 className='inline'><span className='card-text inline'>Created on:</span> {`${nd}/${month}/${year}`}</h3></div>
        <div className='flex inline-flex justify-between flex-row w-full my-1 '>
            <h3>Completed</h3>
            <input onChange={() => {
                setCompleted(prev => !prev)
                updateTodo()
            }} className='checkbox bg-black m-1 w-5 b' type='checkbox' checked={completed}/>
        </div>
    </div>
    </>
  )
}

export default React.memo(Todo)