//@ts-nocheck

export class MetadataUpdate{
    constructor({folderName, description = null, thumbnail = null} = {}){
        this.folderName = folderName
        this.description = description
        this.thumbnail = thumbnail
    }

    toFormData(){
        const formData = new FormData()
        formData.append('folderName', this.folderName)
        if(this.description !== null){
            formData.append('description', this.description)
        }
        if(this.thumbnail !== null){
            formData.append('thumbnail', this.thumbnail)
        }

        return formData
    }

    isValid() {
        return this.folderName && this.folderName.trim() !== '';
    }
}