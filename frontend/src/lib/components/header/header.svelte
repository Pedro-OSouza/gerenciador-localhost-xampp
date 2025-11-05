<script>
// @ts-nocheck

    import { fileSystemStore } from "../../../stores/fileSystemStores";
    import BreadCrumbs from "../breadCrumbs/breadCrumbs.svelte";
    import GoBackBtn from "../goBackBtn/goBackBtn.svelte";

    export let onPathClick
    export let onBack

</script>
<header>
    <div class="container">
        <div class="justify-center">
            <div class="flex-column justify-center">
                <h1>Gerenciador de Projetos</h1>                
                <div>

                    <div class="justify-space-between">
                        <GoBackBtn onBack={onBack} />
                        <BreadCrumbs
                            currentPath={$fileSystemStore.path}
                            onPathClick={onPathClick}
                        />
                    </div>
                </div>        
            </div>
        </div>
        <nav>
            <ul><li>=</li></ul>
        </nav>
    </div>
</header>

<style>
    .flex-column{
        padding: 1rem 0;        
    }

    .justify-space-between{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
</style>