import React,{useState, useEffect} from 'react'
import bloodServices from '../../appwrite/blood'
import ReqCard from './ReqCard'

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
                    <div key={post.$id} className='p-2 w-1/4'>
                        <ReqCard {...post} />
                    </div>
                ))}
            </div>
        </div>
      ) : (
        <div className="w-full h-96 flex justify-center items-center text-xl"
        >Loading...</div>
      )
}

export default AllReq