/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3KbybwLkMA5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import {loginAtom, userDataAtom} from "./Store/store"

export default function Component() {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: ''
    })

    const [isError, setIsError] = useState({
      err: "",
      status: false,
    })

    const setLogin = useSetRecoilState(loginAtom)
    const setUserData = useSetRecoilState(userDataAtom)

  async function getUser(e) {
    e.preventDefault()
    console.log(user)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    try {
      const userData = await axios.post(`${backendUrl}/login`, {
      username: user.username.trim(),
      password: user.password.trim(),
    });
    console.log(userData.data)
    if(userData.data.login === false) {
      setIsError({err: userData.data.msg,
      status: true 
    })
    }

    if(userData.data.login===true) {
      localStorage.setItem('authtoken', userData.data.authorization)
      setLogin(true)
      setUserData(userData.data)
      navigate('/dashboard')
    }

    } catch (error) {
      console.log(error.response.data.msg)
      setIsError({err: error.response.data.msg,
        status: true 
      })
    }
    
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl text-blue-500 font-bold">Sign In</h2>
        </div>
        <form className="space-y-6">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input 
            placeholder="email"
            onChange={(e) => {setUser({...user, username: e.target.value})}}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input 
            placeholder="password"
            onChange={(e) => {setUser({...user, password: e.target.value})}}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {isError.status? <p className="text-center text-red-700">{isError.err}</p>: ""}

          <div>
            <Button onClick={(e) => getUser(e)} className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Next
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm bg-black">
            <span className="px-4 text-gray-500 bg-black">Or continue with</span>
          </div>
        </div>
        <div>
          <NavLink to={"/signup"}>
            <button
            className="w-full hover:text-white hover:bg-yellow-500 rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Account
          </button>
          </NavLink>
          
        </div>
      </div>
    </div>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}