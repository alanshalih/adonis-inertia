<script>
	import FileUploader from './FileUploader.svelte';
  export let form = {
      title : "",
      video_id : "",
      thumbnail : ""
  };
  export let main_video = false;

</script> 
<div class="py-5">
  <div class="md:grid md:grid-cols-3  md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Video</h3>
        <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.
        </p>
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">

      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

          <div class="col-span-6 sm:col-span-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Video Title</label>
            <input type="text" bind:value="{form.title}" name="title" id="title" autocomplete="title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>


      
          <div class="col-span-6 sm:col-span-4">
            <label for="video_id" class="block text-sm font-medium text-gray-700">Youtube Video ID</label>
            <input type="text" bind:value="{form.video_id}" name="video_id" id="video_id" autocomplete="video_id"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>


      


          <div>
            <label for class="block text-sm font-medium text-gray-700"> thumbnail </label>
            <FileUploader bind:path="{form.thumbnail}"></FileUploader>
            
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="candidates" name="candidates" bind:checked="{main_video}" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
            </div>
            <div class="ml-3 text-sm">
              <label for="candidates" class="font-medium text-gray-700">Video Utama</label>
              <p class="text-gray-500">Video utama akan di load ketika halaman dibuka.</p>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
        </div>
      </div>
    </div>
  </div>
</div>
 