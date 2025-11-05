<script>
    // @ts-nocheck
    import { modalStore, closeModal } from "../../../stores/modalStore.js";
    import { writable, get } from "svelte/store";
    import { updateMetadatasService } from "../../../services/updateMetadatasService.js";
  
    const form = writable({ thumbnail: "", description: "", file: null });
  
    // Atualiza o form quando o modal abre
    $: if ($modalStore.isOpen && $modalStore.item) {
      form.set({
        thumbnail: $modalStore.item._metadata?.thumbnail || "",
        description: $modalStore.item._metadata?.description || "",
        file: null
      });
    }
  
    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        form.update(f => ({ ...f, file }));
        // opcional: mostrar preview instantâneo
        const reader = new FileReader();
        reader.onload = () => form.update(f => ({ ...f, thumbnail: reader.result }));
        reader.readAsDataURL(file);
      }
    }
  
    function handleSave() {
      const updated = get(form);
      const folderName = $modalStore.item._name
      const description = updated.description
      const file = updated.file;

      updateMetadatasService.sendRequest({
        folderName,
        description,
        thumbnail: file
      });
      
      closeModal();
    }
  
    function handleClose(event) {
      if (event.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    }
  </script>
  
  {#if $modalStore.isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" on:click={handleClose}>
    <div class="modal">
      <header class="modal-header">
        <h3>Editar Metadados: {$modalStore.item._name}</h3>
      </header>
  
      <section class="modal-body">
        <div class="form-group">
          <label for="thumb">URL da Thumbnail</label>
          <input id="thumb" type="text" bind:value={$form.thumbnail} placeholder="http://..." />
          {#if $form.thumbnail}
            <img src={$form.thumbnail} alt="Preview" class="thumb-preview" />
          {/if}
        </div>
  
        <div class="form-group">
          <label for="file">Enviar Imagem</label>
          <input id="file" type="file" accept="image/*" on:change={handleFileChange} />
        </div>
  
        <div class="form-group">
          <label for="desc">Descrição</label>
          <textarea id="desc" rows="4" bind:value={$form.description} placeholder="Digite uma descrição..."></textarea>
        </div>
      </section>
  
      <footer class="modal-footer">
        <button class="btn secondary" on:click={closeModal}>Cancelar</button>
        <button class="btn primary" on:click={handleSave}>Salvar</button>
      </footer>
    </div>
  </div>
  {/if}
  
    
    <style>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        animation: fadeIn 0.2s ease-out;
    }
    
    .modal {
        background: #1A1B26;
        color: #D0D8F9;
        width: 420px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        animation: slideIn 0.25s ease-out;
        border: 1px solid #7AA2F7;
    }
    
    .modal-header {
        display: flex;
        /* justify-content: space-between; */
        align-items: center;
        position: relative;
        padding: 0.8rem 1rem;
        border-bottom: 1px solid #7AA2F7;
        color: #F8F9FA;
        max-width: 100%;
        width: 100%;
    }
    
    .modal-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-group label {
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
        color: #7AA2F7;
        display: block;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.5rem;
        background: #2B2C3B;
        color: #D0D8F9;
        border: 1px solid #7AA2F7;
        border-radius: 6px;
        outline: none;
        resize: none;
    }
    
    .thumb-preview {
        margin-top: 0.5rem;
        border-radius: 6px;
        width: 100%;
        max-height: 150px;
        object-fit: cover;
        border: 1px solid #7AA2F7;
    }
    
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.8rem 1rem;
        border-top: 1px solid #7AA2F7;
    }
    
    .btn {
        padding: 0.4rem 0.9rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
        font-weight: 500;
    }
    
    .btn.primary {
        background: #7AA2F7;
        color: #1A1B26;
    }
    
    .btn.primary:hover {
        background: #8cb1ff;
    }
    
    .btn.secondary {
        background: #2B2C3B;
        color: #D0D8F9;
        border: 1px solid #7AA2F7;
    }
    
    .btn.secondary:hover {
        background: #35374B;
    }    
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    </style>
    