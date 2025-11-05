import { httpClient } from "../api/httpClient.js";
import { AppApiResponse } from "../entities/appSystem/appAPIResponse.js";

export class AppSystemService{
    async getContents(){
        try {
            const data = await httpClient.getApp();
            return new AppApiResponse(data)

        } catch (error) {
            throw error
        }
    }
}

export const appSystemService = new AppSystemService();