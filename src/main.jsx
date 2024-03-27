import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, About, AllReq,
  Blood, Contact, Login, 
  Signup } from './components/index.js'
import { AddDoc, AllDoc, EditDoc, Doctor, Room} from "./pages/index.js"

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
        path: "doctors",
        element: <AllDoc />
      },
      {
        path: '/doc-cr',
        element: <AddDoc />
      },
      {
        path: '/doc-ud/:slug',
        element: <EditDoc />
      },
      {
        path: '/doctor/:slug',
        element: <Doctor />
      },
      {
        path: "blood",
        element: <Blood />
      },
      {
        path: '/blood-req',
        element: <AllReq />
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
