import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authServices from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap 
    content-between bg-transparent w-full scroll-smooth'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
   : (
    <div className="flex-col w-full my-2 mx-[90%] flex items-center justify-center">
      <div className="w-8 h-8 border-4 text-blue-400  animate-spin
      border-gray-300 border-t-blue-400 rounded-full">    
      </div>
      <h1 className='text-xl'>loading...</h1>
    </div>
   );
}

export default App
