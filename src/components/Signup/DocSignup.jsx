import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";
import docService from "../../appwrite/authDoc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function DocSignup({ post }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: post?.name || "",
            title: post?.title || "",
            slug: post?.$id || "",
            description: post?.description || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null;

            if (file) {
                docService.deleteFile(post.doctorImage);
            }

            const dbPost = await docService.updatePost(post.$id, {
                ...data,
                doctorImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/doctor/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await docService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.doctorImage = fileId;
                const dbPost = await docService.createPost({ ...data, user_id: userData.$id });

                if (dbPost) {
                    navigate(`/doctor/${dbPost.$id}`);
                }
            }
        }
    };


    return (
        <div className="w-full">
            <div
            className="flex items-center justify-center my-8 mx-16 
            text-4xl pb-4 w-full max-w-[800px] bg-gradient-to-r 
            from-blue-700 to-green-700 text-transparent 
            bg-clip-text border-b"
            >{post ? "Update" : "Create"} Profile</div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mx-8 my-14">
                <div className="w-full md:w-2/3 md:px-2">
                    <Input
                        label="Name:"
                        placeholder="Name"
                        className="mb-4"
                        {...register("name", { required: true })}
                    />
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        placeholder="Description"
                        className="mb-4 h-36 p-2 border rounded-lg w-full"
                        {...register("description", { required: true })}
                    />
                </div>

                <div className="w-full md:w-1/3 md:px-2">
                    <Input
                        label="Doctor Image:"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="mb-4">
                            <img
                                src={docService.getFilePreview(post.doctorImage)}
                                alt={post.name}
                                className="rounded-lg w-full"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status:"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>

    );
}