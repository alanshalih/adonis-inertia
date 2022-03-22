<script>

import { Inertia } from '@inertiajs/inertia'
    export let event;
    let viewer = {
      name : '',
      email : '',
      phone : ''
    }

    function handleSubmit() {
        viewer.identifier = event.id_identifier;
        Inertia.post('/view/'+event.id, viewer) 
    }

</script>
<div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="relative max-w-xl mx-auto">
      <svg class="absolute left-full transform translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
          <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <svg class="absolute right-full bottom-0 transform -translate-x-1/2" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
          <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <div class="text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{event.title}</h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">{event.description}.</p>
      </div>
      <div class="mt-12">
        <form on:submit|preventDefault={handleSubmit}  class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          {#if event.show_name} 
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
            <div class="mt-1">
              <input type="text" bind:value="{viewer.name}" name="name" id="name" autocomplete="name" class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
            </div>
          </div>
          {/if}
          {#if event.show_email} 
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input id="email" name="email" bind:value="{viewer.email}" type="email" autocomplete="email" class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
            </div>
          </div>
          {/if}
          {#if event.show_phone} 
          <div class="sm:col-span-2">
            <label for="phone" class="block text-sm font-medium text-gray-700">No.Whatsapp</label>
            <div class="mt-1">
              <input id="phone" name="phone" bind:value="{viewer.phone}" type="number" autocomplete="phone" class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
            </div>
          </div>
          {/if}
          <div class="sm:col-span-2">
            <button type="submit" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Daftar</button>
          </div>
        </form>
      </div>
    </div>
  </div>