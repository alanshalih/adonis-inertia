<script>
    export let path;
    import axios from "axios" 

    function uploadFiles(e){
      
      var fd = new FormData() 
        fd.append("file", e.target.files[0]);
        axios.post('/upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => { 

          if(e.target.id === 'thumbnail')
          {
            path = response.data;
          }
        })
    }
</script>
{#if path}
                   <!-- content here -->
                   <img src="{path}" class="h-48" alt="">
                   <div>
                     <button on:click="{()=>{path  = ''}}">Hapus</button>
                   </div>
                   {:else}
                   <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex justify-center text-sm text-gray-600">
                        <label for="thumbnail" class="relative f  cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span  >Upload a file</span>
                          <input id="thumbnail" on:change="{uploadFiles}"   type="file" class="sr-only">
                        </label> 
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                {/if}