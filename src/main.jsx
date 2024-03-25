import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout, Home, About, 
  Doctors, Blood, Contact, Login, 
  Signup, DocSignup } from './components/index.js'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Room from './pages/Room.jsx'
import Doctor from './pages/Doctor.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "doctors",
        element: <Doctors />
      },
      {
        path: "blood",
        element: <Blood />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/room',
        element: <Room />
      },
      {
        path: '/docsignup',
        element: <DocSignup />
      },
      {
        path: '/doctor/:slug',
        element: <Doctor />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
