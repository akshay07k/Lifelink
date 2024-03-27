import React, {useState, useEffect} from 'react'
import docService from "../appwrite/authDoc"
import DocPost from '../components/home/DocPost'


export default function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        docService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
  return posts.length ? (
    <div className='w-full py-8'>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <DocPost {...post} />
                </div>
            ))}
        </div>
    </div>
  ) : (
    <div className="w-full h-96 flex justify-center items-center text-xl"
    >Loading...</div>
  )
}