import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginAtom } from './Store/store';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userDataAtom } from './Store/store';
import axios from 'axios';
import './components.css'

export default function Header() {
  const isLoggedIn = useRecoilValue(loginAtom)
  const setUserData = useSetRecoilState(userDataAtom)
  const setLogin = useSetRecoilState(loginAtom)
  const navigate = useNavigate()

  async function sessionSignin() {
     try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const user = await axios.get(`${backendUrl}/sessionsignin`, {
        headers: {
          authorization: localStorage.getItem('authtoken'),
        },
      });
      
      if (user.data.login === true) {
        setUserData(user.data)
        setLogin(true)
        console.log(user.data.msg)
        navigate('/dashboard')
      }
      if (user.data.login === false) {
        console.log(user.data.msg)
        navigate('dashboard')
      }
     } catch (error) {
      console.log(error)
      console.log('session login unsuccessful')
     }
  }
  useEffect(()=> {
    sessionSignin()
  }, [])
  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full backdrop-blur-md bg-white/50 dark:bg-gray-900/5 px-4 py-3 shadow-sm transition-all duration-300 md:px-6 md:py-4">
        <div className="container mx-auto flex items-center justify-between">
          
          <button className="flex items-center gap-2 text-black dark:text-white" href="#">
            <NavLink to={"/"}>
              <span className="text-2xl font-semibold">todo<span className='font-bold text-blue-600'>Commit</span></span>
            </NavLink>
            
          </button>
          <nav className={`hidden md:flex flex-1 flex ${isLoggedIn?"justify-end":"justify-center"}`}>
            <div className="flex items-center gap-8 text-gray-900 dark:text-gray-100">
              <NavLink to={"/"}>
                <p className="text-sm font-medium hover:underline" href="#">
                Home
              </p>
              </NavLink>
              
              <NavLink to={"/dashboard"}>
                <p className="text-sm font-medium hover:underline" href="#">
              Dashboard
              </p>
              </NavLink>
              {isLoggedIn? <a onClick={() => {
                localStorage.clear()
                window.location.reload()
              }} className="text-sm font-medium hover:underline text-red-500" href="#">
                Logout
              </a> : null}
              
            </div>
          </nav>
          {isLoggedIn? null :
        <div className="flex items-center gap-2">
        <NavLink to={"/login"}>
        <button
          className="inline-flex items-center rounded-md bg-gray-900 px-4 mx-2 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80 dark:focus:ring-gray-300"
        >
          Login
        </button>
        </NavLink>
        <NavLink to={"/signup"}>
          <button
          className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-300"
          
        >
          Sign Up 
        </button>
        </NavLink>
        
          </div>
          
        }
          
        </div>
      </header>
      {/* <main className="pt-20 md:pt-24" /> */}
    </>
  );
}
