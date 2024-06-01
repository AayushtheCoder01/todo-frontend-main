import { Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import Header from './Header'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import axios from 'axios'
import { loginAtom, userDataAtom } from './Store/store'


function Layout() {
  const setUserData = useSetRecoilState(userDataAtom)
  const setLogin = useSetRecoilState(loginAtom)
  const navigate = useNavigate()
  
  
  return (
    <>
    <div className=''>
      <Header/>
    </div>
    {/* <RecoilRoot> */}
      <Outlet/>
    {/* </RecoilRoot> */}
    

    </>
  )
}

export default Layout