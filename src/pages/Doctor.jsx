import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import docService from "../appwrite/authDoc";
import conf from "../conf/conf";
import { Button } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const [post, setPost] = useState(null);
    const [request, setRequest] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData);
    const isAuthor = post && userData ? post.user_id === userData.$id : false;


    const fetchPost = async () => {
        try {
            if (!slug || !userData) {
                return;
            }

            const post = await docService.getPost(slug);
            if (!post) {
                navigate("/");
                return;
            }

            setPost(post);
            // console.log(post);
            
            const userRequest = post.requests.find(req => {
                const parsedReq = JSON.parse(req);
                return parsedReq.userid === userData.$id;
            });
    
            if (userRequest) {
                setRequest(JSON.parse(userRequest));
                // console.log(request);
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            navigate("/");
        }
    };
    
    useEffect(() => {
        fetchPost();
    }, [slug, navigate, userData])
    

    useEffect(() => {
        
        const unsubscribe = docService.client.subscribe(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId2}.documents`, response => {
            console.log(response);
            if (response.events.includes(
                "databases.*.collections.*.documents.*.update"
              )) {
                console.log('A REQUEST WAS CREATED')
                setRequest(response.payload.requests
                    .map((e)=> JSON.parse(e))
                    .find((e)=> e.userid == userData.$id))
                console.log(request);
                
            }
        });


        // console.log('unsubscribe:', unsubscribe)

        return () => {
            unsubscribe();
        };
    }, [userData]);
    

    const deletePost = () => {
        docService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    docService.deleteFile(post.doctorImage);
                    navigate("/");
                }
            })
            .catch(error => console.error("Error deleting post:", error));
    };

    const deleteRequest =async (id) => {
        // console.log(requests);
        
        const updatedRequests = post.requests
        .map(request => JSON.parse(request))
        .filter((e) => e.userid != id)
        setRequest(updatedRequests);

        await docService.updateRequests(post.$id, updatedRequests).then((status) => {
            status && console.log("Deleted succesfully");
        });

        navigate(`${request.callId}`)
    }

    const updateRequest = () => {
        const requestData = post.requests.map(request => JSON.parse(request));
        const newRequest = { 
            userid: userData.$id,
            name: userData.name, 
            confirm: false,
            callId: "", 
        };
        const updatedRequests = [...requestData, newRequest];

        docService.updateRequests(post.$id, updatedRequests)
            .then((status) => {
                if (status) {
                    toast.success('Request sent successfully')
                    // console.log("Request updated successfully");
                    // setRequest(newRequest);
                }
            })
            .catch(error => {
                console.error("Error updating request:", error);
                toast.error('Try again later')
            });
        
        // console.log(request);
    };

    return post ? (
        <div className="flex flex-col lg:flex-row items-center py-8 min-h-[410px]">
            <div className="lg:w-1/3 mb-4 lg:mb-0">
                <h2 className="ml-20 text-lg font-medium font-sans">Profile Picture:</h2>
                <img
                    src={docService.getFilePreview(post.doctorImage)}
                    alt={post.name}
                    className="rounded-xl w-72 h-52 object-cover ml-24 mb-4"
                />
                {isAuthor && (
                    <div className="mt-2 ml-28 gap-3 flex justify-center lg:justify-start">
                        <Link to={`/doc-ud/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-2">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                    </div>
                )}
            </div>
            <div className="lg:w-2/3 lg:pl-8 max-w-[700px]">
                <div className="text-left">
                    <h2 className="text-lg font-medium font-sans">Name:</h2>
                    <h1 className="text-2xl font-semibold mx-2 mb-2">Dr. {post.name}</h1>
                    <h2 className="text-lg font-medium font-sans">Title:</h2>
                    <h2 className="text-2xl text-gray-600 mx-2 mb-4">{post.title}</h2>
                    <h2 className="text-lg font-medium font-sans">Qualifications:</h2>
                    <p className="text-lg text-gray-700 mx-2 mb-4">{post.description}</p>
                </div>
                {!isAuthor && (
                    <div className="">
                        {request?.callId ? (
                            <Button 
                                onClick={() => deleteRequest(request.userid)}
                                bgColor="bg-blue-500" 
                                className="px-8 py-2 mx-2 opacity-90"
                            >
                                Click to Join 
                            </Button>
                            
                        ) :
                        request ? (
                            <Button 
                                bgColor="bg-blue-500" 
                                className="px-8 py-2 mx-2 opacity-90"
                            >
                                Request sent successfully
                            </Button>
                        ) : (
                            <Button 
                                onClick={updateRequest}
                                bgColor="bg-blue-500" 
                                className="px-8 py-2 mx-2"
                            >
                                Request Consultation
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="flex-col w-full my-2 flex items-center justify-center">
          <div className="w-8 h-8 border-4 text-blue-400  animate-spin
          border-gray-300 border-t-blue-400 rounded-full">
              
          </div>
          <h1 className='text-xl'>loading...</h1>
        </div>
    );
}
