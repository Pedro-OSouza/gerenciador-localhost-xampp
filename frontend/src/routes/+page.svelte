<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { fileSystemStore } from "../stores/fileSystemStores.js";
    import Card from "$lib/components/card/card.svelte";
    import Header from "$lib/components/header/header.svelte";
    import { get } from "svelte/store";
    import { error } from "@sveltejs/kit";
    import BreadCrumbs from "$lib/components/breadCrumbs/breadCrumbs.svelte";
    import GoBackBtn from "$lib/components/goBackBtn/goBackBtn.svelte";
    import { appSystemStore } from "../stores/appSystemStore.js";
    import Modal from "$lib/components/modal/modal.svelte";
    
    onMount(async () => {
        await fileSystemStore.loadPath()
        await appSystemStore.loadApp()
    })

    function handleBack(){
        fileSystemStore.goBack()
    }

    function handleNavigate(event){
        const { item } = event.detail
        if(item._has_index && item._url){
            window.open(item._url, "_blank")
        } else {
            fileSystemStore.loadPath(item._path)
        }
    }

    function handlePathClick(path){
        fileSystemStore.loadPath(path)
    }

</script>
    <Header onPathClick={handlePathClick} onBack={handleBack} />

<main style="background-image: url('{$appSystemStore.wallpaper}')">
    <div class="container">
        <div class="mt-12">
            <div class="vh100">
                {#if $fileSystemStore.loading}
                    <p>Carregando...</p>
                {:else if $fileSystemStore.error}
                    <p>Erro: {$fileSystemStore.error}</p>
                {:else}
                    <div class="flex-row gap-1 flex-wrap">  
                        {#each $fileSystemStore.items as item}
                            {#if (item._name !== 'hub')}
                                <Card folderName={item._name} item={item} path={item._path} on:navigate={handleNavigate} img={item._metadata.thumbnail} />
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>

    <Modal />
</main>

<style>
    main{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
