//@ts-nocheck
import { MetadataUpdateAPi } from "../entities/metadataUpdate/metadataUpdateApi.js";

export class UpdateMetadasService{
    sendRequest({folderName, description = null, thumbnail = null} = {}){
        console.log('dados recebidos em [updateMetadasService]: =======================================================')
        console.table({folderName, description, thumbnail})
        const item = new MetadataUpdateAPi({folderName, description, thumbnail})
        console.log('objeto "item" recebido em [updateMetadasService]: ==================================================')
        console.table(item)

        item.sendRequest()
    }
}

export const updateMetadatasService = new UpdateMetadasService()