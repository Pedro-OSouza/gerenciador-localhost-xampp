// @ts-nocheck
import { App } from "./appSystem.js"

export class AppApiResponse{
    constructor({ok, data}){
        this.ok = ok
        this.data = new App(data)
    }

    get isValid(){
        return this.ok
    }

}