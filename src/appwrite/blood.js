import conf from '../conf/conf.js'
import { Client, Databases, ID } from 'appwrite'

export class BloodServices {
    client = new Client();
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async getMessages(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3,
            )
        } catch (error) {
            console.log("Appwrite service :: getMessages :: error", error);
        }
    }

    async createMessage(payload){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId3, 
                ID.unique(),
                payload 
            )
        } catch (error) {
            console.log("Appwrite service :: createMessage :: error", error);
        }
    }

    async deleteMessage(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3, 
                id
            );
        } catch (error) {
            console.log("Appwrite service :: deleteMessage :: error", error);
        }
    }

}

const bloodServices = new BloodServices();

export default bloodServices;
