import React,{useState, useEffect} from 'react'
import bloodServices from '../../appwrite/blood'
import ReqCard from './ReqCard'
import { Link } from 'react-router-dom'

function AllReq() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        bloodServices.getMessages([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                console.log(posts);
            }
        })
    }, [])
    
  
    return posts.length ? (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <Link to={`/blood-req/${post.$id}`} key={post.$id}
                     className='p-2 w-1/4'>
                        <ReqCard {...post} />
                    </Link>
                ))}
            </div>
        </div>
      ) : (
        <div className="w-full h-96 flex justify-center items-center text-xl"
        >Loading...</div>
      )
}

export default AllReq