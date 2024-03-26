import React, {useState,useEffect} from 'react'
import { DocSignup } from '../components'
import docService from '../appwrite/authDoc'
import { useNavigate, useParams } from 'react-router-dom'


function EditDoc() {

    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if(slug){
        docService.getPost(slug)
        .then((post) => {
            if(post){
                setPost(post)
            }
        })
      }
      else{
        navigate('/')
      }
    }, [slug, navigate])

  return post ? (
    <div>
        <DocSignup post={post}/>
    </div>
  ) : null
}

export default EditDoc