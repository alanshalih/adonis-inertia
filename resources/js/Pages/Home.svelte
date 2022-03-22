<script>
  import Layout from "../Layout/homelayout.svelte"
  import {
    inertia
  } from '@inertiajs/inertia-svelte'
  import {
    page
  } from '@inertiajs/inertia-svelte'
  export let events;

</script>
<Layout>
  <div slot="subheader">
    <div
      class="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
      <div>
        <h4 class="text-2xl font-bold leading-tight text-gray-800">Welcome {$page.props.user.name}</h4>
        <!-- <ul class="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
          <li class="flex items-center mr-3 mt-3 md:mt-0">
            <span class="mr-2">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg8.svg" alt="Active">
            </span>
            <span>Active</span>
          </li>
          <li class="flex items-center mr-3 mt-3 md:mt-0">
            <span class="mr-2">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg9.svg"
                alt="Trending">
            </span>
            <span> Trending</span>
          </li>
          <li class="flex items-center mt-3 md:mt-0">
            <span class="mr-2">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg10.svg" alt="date">
            </span>
            <span>Started on 29 Jan 2020</span>
          </li>
        </ul> -->
      </div>
      <div class="mt-6 lg:mt-0">

        <a href="/event/create" use:inertia
          class="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 border bg-indigo-700 rounded text-white px-8 py-2 text-sm">Tambah
          Event</a>
      </div>
    </div>

  </div>
  <div slot="content">
    {#if events.length == 0}
          <!-- content here -->
    
    <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
        <div class="mt-6">
          <a href="/event/create" use:inertia class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <!-- Heroicon name: solid/plus -->
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Event
          </a>
        </div>
      </div>
      {:else}
      
      <ul  class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each events as item}
           <!-- content here -->
           <li class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
              <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                  <h3 class="text-gray-900 text-sm font-medium truncate">{item.title}</h3>
                  <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">Admin</span>
                </div>
                <p class="mt-1 text-gray-500 text-sm truncate">{item.description}</p>
              </div>
              <img class="w-14   flex-shrink-0" src="{item.logo}" alt="">
            </div>
            <div>
              <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex">
                  <a href="/event/{item.id}/edit" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/mail -->
                    <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span class="ml-3">Edit</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="/{item.slug}" target="_blank" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/phone -->
                    <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span class="ml-3">Link</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="tel:+1-202-555-0170" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <!-- Heroicon name: solid/phone -->
                    <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span class="ml-3">Peserta</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        {/each}
        
      
        <!-- More people... -->
      </ul>
      {/if}
 </div>
 
</Layout>
