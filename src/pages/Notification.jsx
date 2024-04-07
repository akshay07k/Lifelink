import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import docService from '../appwrite/authDoc'
import NotfCard from "./NotfCard"
import RefreshIcon from '@mui/icons-material/Refresh';

function Notification() {

    const [requests, setRequests] = useState([])
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            docService.getPost(slug).then((post) => {
                if (post) {
                    const data = post.requests
                    .map(request => JSON.parse(request))
                    setRequests(data)
                    setPost(post)
                    console.log(data);
                }
                else navigate("/");
            });
        } 

    }, [slug, navigate]);

    const acceptRequest = async (userid, roomid) => {
        const index = requests.findIndex((e) => e.userid == userid)
        requests[index].callId = `/video/${roomid}`;
        requests[index].confirm = true;
        console.log(requests);

        await docService.updateRequests(post.$id, requests).then((status) => {
            status && console.log("Accepted succesfully");
        });
    }

    const rejectRequest = (id) => {
        // console.log(requests);
        
        const updatedRequests = requests.filter((e) => e.userid != id)
        setRequests(updatedRequests);

        docService.updateRequests(post.$id, updatedRequests).then((status) => {
            status && console.log("Deleted succesfully");
        });
    }
    


  return requests.length ? (
    <div>
        {requests.map((data) => (
            <div key={data.userid}>
                <NotfCard {...data} rejectRequest={rejectRequest} 
                acceptRequest={acceptRequest} />
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