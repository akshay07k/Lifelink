import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";
import docService from "../../appwrite/authDoc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DocSignup({ post }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: post?.name || "",
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mx-8 my-14">
            <div className="w-2/3 px-2">
                <Input
                    label="Name :"
                    placeholder="Name"
                    className="mb-4"
                    {...register("name", { required: true })}
                />
                <textarea
                    label="Description :"
                    placeholder="Description"
                    className="mb-4 p-2 border w-full rounded-lg"
                    {...register("description", { required: true })}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Doctor Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={docService.getFilePreview(post.doctorImage)}
                            alt={post.name}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}