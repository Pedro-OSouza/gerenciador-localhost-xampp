//@ts-nocheck
import { MetadataUpdateAPi } from "../entities/metadataUpdate/metadataUpdateApi.js";

export class UpdateMetadasService{
    sendRequest({folderName, description = null, thumbnail = null} = {}){
        const item = new MetadataUpdateAPi({folderName, description, thumbnail})

        return item.sendRequest()
    }
}

export const updateMetadatasService = new UpdateMetadasService()