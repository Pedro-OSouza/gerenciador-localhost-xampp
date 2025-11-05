<script>
// @ts-nocheck
    import { Icon } from "svelte-icons-pack";
    import { AiFillEdit } from "svelte-icons-pack/ai"
    import { createEventDispatcher } from "svelte";
    import { openModal } from "../../../stores/modalStore.js";

    export let folderName
    export let img
    export let path
    export let item

    const dispatch = createEventDispatcher()

    function handleClick(){
        dispatch('navigate', { item })
    }

    function handleEditClick(event){
        event.stopPropagation();
        openModal(item)
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="card" data-path={path} onclick={handleClick}>
    <div class="card-header">
        <div class="card-image">
            <img src={img} alt={img || "Não encontrado"}>
        </div>
    </div>
    <div class="card-body">
        <h2>{folderName}</h2>
        <button class="edit-btn" onclick={handleEditClick}><Icon src={AiFillEdit} /> </button>
    </div>
</div>

<style>
    .card-body{
        display: flex;
        justify-content: space-between;
    }

    h2{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .edit-btn{
        border: none;
        border-radius: 8px;
        background-color: #f8f9fa;
        cursor: pointer;
        padding: .5rem;
        margin-bottom: 3rem;
        margin-top: -.5rem
    }
</style>