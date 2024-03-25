import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import docService from "../appwrite/authDoc";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
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
        <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={docService.getFilePreview(post.doctorImage)}
                        alt={post.name}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-doctor/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.name}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.description)}
                    </div>
        </div>
    ) : <div>hekko</div>;
}