import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userDataAtom } from './Store/store'
import "./components.css"
import AddTodo from './AddTodo'
import { useNavigate } from 'react-router-dom'
import { Alert } from '../ui/alert'
import axios from 'axios'
import Todo from './Todo'
import Category from './Category'
import NewCategory from './NewCategory'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Dashboard() {
  const [userData, setUserData] = useRecoilState(userDataAtom)
  const {category} = useParams()

  const [addTodo, setAddTodo] = useState(false)
  const [addCategory, setAddCategory] = useState(false)
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [userTodos, setUserTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [usercategory, setUserCategory] = useState([])

  async function getTodos() {
    try {
      const todos = await axios.get(`${backendUrl}/todos`,{
        headers : {
          authorization : localStorage.getItem('authtoken')
        }
      })
  
      if(todos.data.status = 200) {
        setUserTodos(todos.data.userTodos.reverse())
        setUserCategory(userData.userData.usercategory)
        setFilteredTodos(todos.data.userTodos.reverse())
      } 
      
      if(todos.data.login = false) {
        console.log(todos.data.msg)
      }

    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=> {
    if(userData === null) navigate('/login')
      getTodos()
  }, [])

  useEffect(() => {
    filterTodos()
  }, [category])

  async function filterTodos() {
    if(category !== undefined) {
      const Todos = userTodos.filter((todo) => todo.category == category)
      setFilteredTodos(Todos)
    }
    if(category == undefined) {
      setFilteredTodos(userTodos)
    }
  }
  return (
    <>
        
    <div className='dashboard'>
    <div className="box mt-[9.1vh] min-h-screen grid grid-cols-[25%_75%]">
      
      <div className="flex flex-col p-5 md:p-7 rounded-md">
        <div className='flex w-full h-[7vh] justify-center items-center'>
          <button onClick={() => setAddCategory(prev => !prev)} className='bg-green-500 m-1 p-2 px-3 rounded-lg'>Add</button>
          {addCategory? <NewCategory getTodos={getTodos} setAddCategory={setAddCategory}/> : null}
        </div>
        {/* 30% Height Box */}
        <div className='flex w-full flex-col mt-4'>
        <NavLink to={`/dashboard`} className={({ isActive }) =>
        isActive ? 'text-blue-500' : 'text-white'
      }
      
>
        <div className={`my-3 category-card w-full h-[auto] md:h-[auto] m-1 p-2 px-10 py-3 md:py-7 rounded-xl`}>
        <div className='flex h-full w-full justify-center items-center text-md md:text-2xl category-card-title'>All</div>
    </div>
    </NavLink>
         {usercategory.map((item, index) => {
           return (
          <div className='w-full' key={index}>
              <Category Category={item} index={index}/>
          </div>
         )
         }
         )}   
        </div>
        
      </div>

      <div className="rounded-md p-5">
        <div className='todobox flex justify-center'>
          {/* {addTodo? <AddTodo setAddTodo={setAddTodo} getTodos={getTodos}/> : null} */}
          {addTodo? <AddTodo setAddTodo={setAddTodo} getTodos={getTodos}/> : null}
        
        </div>
        {/* 70% Height Box */}

        <div className='flex h-[10vh] w-full items-center justify-center inline'>
          {/* <input className='bg-zinc-800 rounded-md h-10 w-6/12'/> */}
          {addTodo? null: <button onClick={()=> setAddTodo(true)} type="button" className="todo-btn transition transform active:scale-90 dark:text-zinc-100 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-gradient-to-bl  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">New Todo</button>}
          
        </div>
        <div className='ml-2 flex md:flex-wrap md:flex-row flex-col md:justify-normal justify-center text-white h-auto w-full p-2 my-4'>
          {filteredTodos.map((todo) => {
             return (
              <div key={todo._id}>
                <Todo todo={todo} getTodos={getTodos}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard