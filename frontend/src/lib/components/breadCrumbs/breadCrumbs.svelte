<script>
// @ts-nocheck

    export let currentPath = "/";
    export let onPathClick;

    $: pathParts =
        currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);

    function handlePathClick(part, index) {
        if (onPathClick) {
            const path =
            index === -1 ? "/" : "/" + pathParts.slice(0, index + 1).join("/");
            onPathClick(path);
        }
    }
</script>

<nav class="breadcrumb">
    <button class="breadcrumb-item root" on:click={() => handlePathClick("", -1)}>
    📁 Raiz
    </button>

    {#each pathParts as part, index}
        <span class="separator">/</span>
        <button
            class="breadcrumb-item"
            on:click={() => handlePathClick(part, index)}
        >
            {part}
        </button>
    {/each}
</nav>

<style>
.breadcrumb {
    display: flex;
    align-items: center;
    padding: .5rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    margin: 1rem auto;
}

.breadcrumb-item {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
    font-size: 0.9rem;
}

.breadcrumb-item:hover {
    background-color: #e9ecef;
}

.breadcrumb-item.root {
    font-weight: bold;
}

.separator {
    font-size: 0.9rem;
    margin: 0 0.5rem;
    color: #6c757d;
}
</style>
