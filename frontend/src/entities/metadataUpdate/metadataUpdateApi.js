// @ts-nocheck

import { MetadataUpdate } from "./metadataUpdate.js";
import { httpClient } from "../../api/httpClient.js";
import { API_ROUTES } from '../../api/apiEndpoints.js';

export class MetadataUpdateAPi {
    constructor({folderName, description = null, thumbnail = null} = {}){
        this.metadataUpdateItem = new MetadataUpdate({folderName, description, thumbnail})

        this.formData = this.metadataUpdateItem.toFormData()
    }

    isValid(){
        return this.metadataUpdateItem.isValid();
    }

    async sendRequest(){
        return await httpClient.postFormData(API_ROUTES.UPDATEMETADATAS, this.formData)
    }
}

