// @ts-nocheck
import { FileSystemItem } from "./fileSystemItem.js";

export class APIResponse{
    constructor({ok, path, items = []}){
        this.ok = ok
        this.path = path
        this.items = items.map(item => new FileSystemItem(item))
    }

    get isValid(){
        return this.ok && Array.isArray(this.items)
    }

    get currentPath(){
        return this.path
    }

    get itemsCount(){
        return this.items.length
    }
}