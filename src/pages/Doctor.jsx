import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import docService from "../appwrite/authDoc";
import { Button } from "../components";
import { useSelector } from "react-redux";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatIcon from '@mui/icons-material/Chat';


export default function ProfilePage() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.user_id === userData.$id : false;

    useEffect(() => {
        if (slug) {
            docService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        docService.deletePost(post.$id).then((status) => {
            if (status) {
                docService.deleteFile(post.doctorImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="flex flex-col lg:flex-row items-center py-8
        min-h-[410px]">
            <div className="lg:w-1/3 mb-4 lg:mb-0">
                <h2 className="ml-20 text-lg font-medium font-sans">
                    Profile Picture:</h2>
                <img
                    src={docService.getFilePreview(post.doctorImage)}
                    alt={post.name}
                    className="rounded-xl w-72 h-52 object-cover ml-24 mb-4"
                />
                {isAuthor && (
                    <div className="mt-2 ml-28 gap-3 flex justify-center lg:justify-start">
                        <Link to={`/doc-ud/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-2">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="lg:w-2/3 lg:pl-8 max-w-[700px] ">
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
                        <Button bgColor="bg-blue-500" className="px-8 py-2 mx-2">
                            <VideoCallIcon/>video call
                        </Button>
                        <Button bgColor="bg-blue-500" className="px-8 py-2 mx-2">
                            <ChatIcon/>chat
                        </Button>
                    </div>
                )}
            </div>

        </div>
    ) : <div className="w-full h-96 flex justify-center items-center text-xl"
    >Loading...</div>;
}
