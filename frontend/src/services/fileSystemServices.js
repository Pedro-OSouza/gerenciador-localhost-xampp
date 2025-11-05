// @ts-nocheck
import { httpClient } from "../api/httpClient.js";
import { APIResponse } from "../entities/fileSystem/apiResponse.js";

export class FileSystemService{
    async getContents(path ='/'){
        try{
            const data = await httpClient.get('list', path )
            return new APIResponse(data)
        } catch(error){
            console.log(`FileSystemService error: ${error}`)
            throw error
        }
    }

    async getRoot(){
        return this.getContents('/')
    }
}

export const fileSystemService = new FileSystemService()
