import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, About, AllReq, ReqPage,
  Blood, Contact, Login, Signup } from './components/index.js'
import { AddDoc, AllDoc, EditDoc, Doctor,
   Room, Notification, Video} from "./pages/index.js"

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
        path: '/video/:roomid',
        element: <Video />
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
      {
        path: '/blood-req/:slug',
        element: <ReqPage />
      },
      {
        path: '/notifications/:slug',
        element: <Notification />
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
