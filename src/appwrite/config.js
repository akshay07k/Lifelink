import conf from '../conf/conf.js'
import { Client, Databases, ID, Teams, Query } from 'appwrite'

export class Services {
    client = new Client();
    teams;
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.teams = new Teams(this.client);
        this.databases = new Databases(this.client);
    }

    async getMessages(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )
        } catch (error) {
            console.log("Appwrite service :: getMessages :: error", error);
        }
    }

    async createMessage(payload){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
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
                conf.appwriteCollectionId, 
                id
            );
        } catch (error) {
            console.log("Appwrite service :: deleteMessage :: error", error);
        }
    }

    async teamMembers(){
        try {
            const promise = this.teams.listMemberships(conf.appwriteTeamId);

            promise.then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        } catch (error) {
            console.log("Appwrite service :: teamMembers :: error", error);
        }
    }
}

const service = new Services();

export default service;
