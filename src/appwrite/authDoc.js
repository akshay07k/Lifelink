import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DocServices {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({name, description, doctorImage,
    status, user_id, title}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                ID.unique(),
                {
                    name,
                    description,
                    status,
                    user_id,
                    doctorImage,
                    title
                }
            )
        } 
        catch (error) {
            console.log("Appwrite service :: createPost :: error",
            error);
        }
    }

    async updatePost(slug, {name, description, doctorImage,
    status, title}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug,
                {
                    name,
                    description,
                    doctorImage,
                    status,
                    title
                }
            )
        } 
        catch (error) {
            console.log("Appwrite service :: updatePost :: error",
            error);
        }
    }

    async updateRequests(slug, requests) {
        try {
            // Convert each request object to a string
            const serializedRequests = requests.map(request => JSON.stringify(request));
    
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug,
                {
                    requests: serializedRequests 
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updateRequests :: error", error);
            throw error;
        }
    }
    
    

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug
            )
            return true;
        } 
        catch (error) {
            console.log("Appwrite service :: deletePost :: error",
            error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug
            )
        } 
        catch (error) {
            console.log("Appwrite service :: getPost :: error",
            error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status",
    "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                queries,

            )
        } 
        catch (error) {
            console.log("Appwrite service :: getPosts :: error",
            error);
            return false;
        }
    }

    // File upload services

    async uploadFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } 
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error",
            error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } 
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error",
            error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const docService = new DocServices();

export default docService;