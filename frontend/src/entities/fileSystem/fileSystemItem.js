// @ts-nocheck
export class FileSystemItem {
    constructor({ name, type, path, has_index = false, metadata = {}, url } = {}){
        this._name = name;
        this._type = type;
        this._path = path;
        this._has_index = has_index;
        this._metadata = metadata;
        this._url = url;
    }

    get name() { return this._name }
    get type() { return this._type }
    get path() { return this._path }
    get hasIndex() { return this._has_index }

    get isFolder(){ return this._type === 'folder' }
    get isFile(){ return this._type === 'file' }

    get thumbnail(){ return this._metadata?.thumbnail }
    get description(){ return this._metadata?.description }
    get hasThumbnail(){ return !!this.thumbnail }

    isValid(){ return this._name && this._type && this._path }
}
