// @ts-nocheck
import { writable } from "svelte/store";
import { fileSystemService } from "../services/fileSystemServices.js";
import { error } from "@sveltejs/kit";

function createFileSystemStore(){
    const { subscribe, set, update} = writable({
        items: [],
        path: '/',
        loading: false,
        error: null,
        history: ['/'],
        historyIndex: 0
    })

    return {
        subscribe,
        
        async loadPath(path = '/'){
            update(state => ({...state, loading: true, error: null}))

            try {
                const response = await fileSystemService.getContents(path)

                update((state) => {
                    const newHistory = state.history.slice(0, state.historyIndex +1)
                    newHistory.push(response.currentPath)
                    return {
                        ...state,
                        items: response.items ?? [],
                        loading: false,
                        path: response.currentPath,
                        error: null,
                        history: newHistory,
                        historyIndex: newHistory.length -1,
                    };
                })
            } catch (error) {
                update(state => ({
                    ...state,
                    loading: false,
                    error:error.message
                }))
            }
        },

        
        async loadRoot(){
            await this.loadPath('/')
        },

        async navigateToFolder(folderPath){
            await this.loadPath(folderPath)
        },

        updateItemMetadata(folderName, metadata) {
            update(store => {
                const items = store.items.map(item => {
                    if (item._name === folderName) {
                    return {
                        ...item,
                        _metadata: {
                        ...item._metadata,
                        ...metadata
                        }
                    };
                    }
                    return item;
                });
                return { ...store, items };
                });
        },

        goBack(){
            update(state => {
                if(state.historyIndex > 0){
                    const newIndex = state.historyIndex - 1
                    const previousPath = state.history[newIndex]
                    this.loadPath(previousPath)
                    return {...state, historyIndex: newIndex }
                }
                return state
            })
        },

        clearError() {
            update(state => ({ ...state, error: null }));
        }
    }
}

export const fileSystemStore = createFileSystemStore();