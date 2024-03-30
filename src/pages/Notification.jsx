import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import docService from '../appwrite/authDoc'
import NotfCard from "./NotfCard"
import RefreshIcon from '@mui/icons-material/Refresh';

function Notification() {

    const [requests, setRequests] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            docService.getPost(slug).then((post) => {
                if (post) {
                    const data = post.requests.map(request => JSON.parse(request))
                    setRequests(data)
                    console.log(data);
                }
                else navigate("/");
            });
        } 

    }, [slug, navigate]);
    


  return requests.length ? (
    <div>
        {requests.map((data) => (
            <div key={data.userid}>
                <NotfCard {...data}/>
            </div>
        ))}
    </div>
  ) : (
    <div className="flex justify-center items-center">
        <div className="text-center">
            <RefreshIcon />
            <h2 className="mt-2">loading...</h2>
        </div>
    </div>
  )
}

export default Notification