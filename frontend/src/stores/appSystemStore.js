// @ts-nocheck
import { writable } from "svelte/store";
import { appSystemService } from "../services/appSystemService";

function createAppSystemStore(){
    const {subscribe, set, update} = writable({
        wallpaper: "",
        loading: false,
        error: null
    })

    return{
            subscribe,

        async loadApp(){
            update(state => ({...state, loading: true}))
            try {
                const response = await appSystemService.getContents();
                
                update(state => ({
                    ...state,
                    wallpaper: response.data._wallpaper,
                    loading: false,
                    error: null
                }))
            } catch (error) {
                update(state => ({
                    ...state,
                    loading: false,
                    error:error.message
                }))
            }
        }
    }
}

export const appSystemStore = createAppSystemStore()