import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, About, AllReq, ReqPage, Blood, Contact, Login, Signup, AuthLayout, Location } from './components/index.js'
import { AddDoc, AllDoc, EditDoc, Doctor, Room, Notification, Video} from "./pages/index.js"

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
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: '/login',
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        )
      },
      {
        path: '/room',
        element: (
          <AuthLayout authentication>
            <Room />
          </AuthLayout>
        )
      },

      {
        path: '/video/:roomid',
        element: (
          <AuthLayout authentication>
            <Video />
          </AuthLayout>
        )
      },
      {
        path: "doctors",
        element: (
          <AuthLayout authentication>
            <AllDoc />
          </AuthLayout>
        )
      },
      {
        path: '/doc-cr',
        element: (
          <AuthLayout authentication>
            <AddDoc />
          </AuthLayout>
        )
      },
      {
        path: '/doc-ud/:slug',
        element: (
          <AuthLayout authentication>
            <EditDoc />
          </AuthLayout>
        )
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
      {
        path: '/blood-req/:slug',
        element: <ReqPage />
      },
      {
        path: '/notifications/:slug',
        element: <Notification />
      },
      {
        path: '/location',
        element: <Location />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Bounce
    />
  </React.StrictMode>,
)
