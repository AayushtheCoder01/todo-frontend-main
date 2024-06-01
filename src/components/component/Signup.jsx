/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3KbybwLkMA5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginAtom, userDataAtom } from "./Store/store";

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [isError, setIsError] = useState({
    err: "",
    status: false,
  })
  const navigate = useNavigate()
  const setUserData = useSetRecoilState(userDataAtom)
  const setLogin = useSetRecoilState(loginAtom)

  async function createUser(e) {
    e.preventDefault()
    console.log(user)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    try {
      const userData = await axios.post(`${backendUrl}/signup`, {
      username: user.username.trim(),
      password: user.password.trim(),
    });
    
    if(userData.data.signup === false) {
      setIsError({err: userData.data.msg,
        status: true 
      })
    }
    if(userData.data.signup === true) {
      localStorage.setItem('authtoken', userData.data.authorization)
      setUserData(userData.data)
      setLogin(true)
      navigate('/dashboard')
    }
    
    } catch (error) {
      console.log(error)
      setIsError({err: error.response.data.msg,
        status: true 
      })
    }
    
  }

  
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl text-yellow-500 font-bold">Signup</h2>
        </div>
        <form className="space-y-6">
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="email"
              min={10}
              placeholder="Email"
              type="email"
              onChange={(e) => {setUser({...user, username: e.target.value})}}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="password"
              placeholder="Password"
              type="text"
              min={1}
              onChange={(e) => {setUser({...user, password: e.target.value})}}
            />
          </div>
          {isError.status? <p className="text-center text-red-700">{isError.err}</p>: ""}
          
          <div>
          <Button onClick={(e) => createUser(e)} className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Next
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
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