<script>
  import axios from "axios"
import FileUploader from "./FileUploader.svelte";
    export let form = {}; 

    function uploadFiles(e){
      
      var fd = new FormData() 
        fd.append("file", e.target.files[0]);
        axios.post('/upload', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(e.target.id)
          if(e.target.id == 'upload-logo')
          {
            form.logo = response.data; 
          }

          if(e.target.id === 'thumbnail')
          {
            form.thumbnail = response.data;
          }
        })
 
    }
</script>
<div class="py-5">
    <div class="md:grid md:grid-cols-3  md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2"> 
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label for="company-website" class="block text-sm font-medium text-gray-700"> URL </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> {location.origin}/ </span>
                    <input bind:value="{form.slug}" type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="channel">
                  </div>
                </div>
              </div>
              
              <div class="col-span-6 sm:col-span-4">
                <label for="title" class="block text-sm font-medium text-gray-700">Judul Acara</label>
                <input  bind:value="{form.title}" type="text" name="title" id="title" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
  

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
                <div class="mt-1">
                  <textarea  bind:value="{form.description}" id="about" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="jelaskan secara singkat tentang acara"></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">Brief description for your event. URLs are hyperlinked.</p>
              </div>
  
              <div>
                <label for="logo" class="block text-sm font-medium text-gray-700"> Logo </label>
                <div class="mt-1 flex items-center">
                  <span class="inline-block   w-20 overflow-hidden bg-gray-100"> 
                    {#if form.logo}
                       <!-- content here -->
                       <img src="{form.logo}" alt="">
                       {:else}
                       <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    {/if}
                 
                  </span>
                  <input type="file" id="upload-logo"  on:change="{uploadFiles}" class="hidden">
                  <button on:click="{()=>{document.querySelector('#upload-logo').click()}}" type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Change</button>
                </div>
              </div>
  
  
               
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
          </div> 
      </div>
    </div>
  </div>

  
  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>
  
  <div class="py-5">
    <div class="md:grid md:grid-cols-3  md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Share Display</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            
              <div class="col-span-6 sm:col-span-4">
                <label for="title" class="block text-sm font-medium text-gray-700">Share Title</label>
                <input type="text" bind:value="{form.social_share_title}" name="title" id="title" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
  

              <div>
                <label for="about" class="block text-sm font-medium text-gray-700"> Share Subtitle </label>
                <div class="mt-1">
                  <textarea id="about" bind:value="{form.social_share_subtitle}" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder=" "></textarea>
                </div> 
              </div>
  
             
  
              <div>
                <label for class="block text-sm font-medium text-gray-700"> thumbnail </label>
                <FileUploader bind:path="{form.thumbnail}"></FileUploader>
               
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
          </div> 
      </div>
    </div>
  </div> 
  
  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>

  <div class="py-5">
    <div class="md:grid md:grid-cols-3  md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Share Display</h3>
          <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label for="head_script" class="block text-sm font-medium text-gray-700"> Head Scrript </label>
                <div class="mt-1">
                  <textarea id="head_script" bind:value="{form.head_script}" name="head_script" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder=" "></textarea>
                </div> 
              </div>
          

              <div>
                <label for="body_script" class="block text-sm font-medium text-gray-700"> Body Script </label>
                <div class="mt-1">
                  <textarea id="body_script" bind:value="{form.body_script}" name="body_script" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder=" "></textarea>
                </div> 
              </div>
  
             
  
              
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
          </div> 
      </div>
    </div>
  </div> 
  
  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200"></div>
    </div>
  </div>
  
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
          <p class="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2"> 
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900">Optin Form</legend>
                <div class="mt-4 space-y-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="comments" name="comments" bind:checked="{form.show_name}"  type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="comments" class="font-medium text-gray-700">Nama</label>
                      <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="candidates" name="candidates" bind:checked="{form.show_phone}" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="candidates" class="font-medium text-gray-700">Phone</label>
                      <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="offers" name="offers" bind:checked="{form.show_email}"  type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="offers" class="font-medium text-gray-700">Email</label>
                      <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">ID Identifier</label>
                <select bind:value="{form.id_identifier}" id="country" name="country" autocomplete="country-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="phone">Phone</option>
                  <option value="email">Email</option> 
                </select>
              </div>

               
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </div>
          </div>
 
      </div>
    </div>
  </div>