import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Homepage from './components/component/Homepage.jsx'
import Component from './components/component/Login.jsx'
import Signup from './components/component/Signup.jsx'
const Dashboard = lazy(() => import('./components/component/Dashboard.jsx'));
import Layout from './components/component/Layout.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <Homepage/>
            },
            {
                path:"login",
                element: <Component/>
            },
            {
                path: "signup",
                element: <Signup/>
            },
            {
                path: "dashboard",
                element: <Suspense><Dashboard/></Suspense>,
                // children: [
                //     {
                //         path: "dashboard/:category",
                //         element: <Suspense><Dashboard/></Suspense>
                //     }
                // ]

            },
            {
                path: "category/:category",
                element: <Suspense><Dashboard/></Suspense>
            }
            
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
       <RouterProvider router={router}/>
       <App />  
    </RecoilRoot>
    

    
    
)
