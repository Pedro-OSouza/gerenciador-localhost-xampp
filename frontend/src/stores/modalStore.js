// @ts-nocheck
import { writable } from "svelte/store";

export const modalStore = writable({
    isOpen: false,
    item: null
})

export function openModal(item){
    modalStore.set({isOpen: true, item})
}

export function closeModal(){
    modalStore.set({isOpen: false, item: null})
}