import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import docService from '../appwrite/authDoc'
import conf from '../conf/conf'
import NotfCard from "./NotfCard"
import RefreshIcon from '@mui/icons-material/Refresh';
import { dark } from '@mui/material/styles/createPalette'
import { toast } from 'react-toastify'

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

    // function getRequests() {
    //     if(!post) return;
    //     const userRequest = post?.requests.map(request => JSON?.parse(request))
    //     if(userRequest)
    //         setRequests(JSON.parse(userRequest));
    // }
    useEffect(() => {

        const unsubscribe = docService.client.subscribe(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId2}.documents`, response => {
            console.log(response);
            if (response.events.includes(
                "databases.*.collections.*.documents.*.update"
              )) {
                console.log('A REQUEST WAS CREATED')
                // toast.info('New request')
                setRequests(response.payload.requests.map((e)=>JSON.parse(e)))
                
            }
        });


        // console.log('unsubscribe:', unsubscribe)
        // console.log(requests);

        return () => {
            unsubscribe();
        };
    }, []);

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
            status && toast.error("Rejected succesfully");
        });
    }
    


  return requests?.length ? (
    <div>
        {requests.map((data) => (
            <div key={data.userid}>
                <NotfCard {...data} rejectRequest={rejectRequest} 
                acceptRequest={acceptRequest} />
            </div>
        ))}
    </div>
  ) : (
    <div className="flex-col w-full my-2 flex items-center justify-center">
        <div className="w-8 h-8 border-4 text-blue-400  animate-spin
        border-gray-300 border-t-blue-400 rounded-full">
            
        </div>
        <h1 className='text-xl'>loading...</h1>
    </div>
  )
}

export default Notification