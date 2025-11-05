<script>
// @ts-nocheck

    import { Icon } from "svelte-icons-pack";
    import { AiOutlineArrowLeft } from "svelte-icons-pack/ai"

    export let onBack
    function handleBack(){
        if(onBack){
            onBack();
        }
    }
</script>

<button on:click={() => handleBack()}><Icon src={AiOutlineArrowLeft}/></button>

<style>
    button{
        padding: .7rem;
        border: none;
        border-radius: 8px;
        background: #f8f9fa;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>