import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./components/component/Login"
import Background from './components/component/Background'
import AlertUi from './components/component/Alert'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
    <Background/>
    </>
  )
}

export default App
