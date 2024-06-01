import React from 'react'
import Background from './Background'

import "./components.css"
import { TypingAnimation } from './TypingAnimation'

function Homepage() {
  return (
    <>
    <div className='homepage'>
      <Background/>
      <TypingAnimation/>
    </div>
    <p className="text-neutral-400 text-center bg-black text-xs sm:text-base py-2">
        Made with ❤️ By Aayush.
      </p>
    </>
  )
}

export default Homepage