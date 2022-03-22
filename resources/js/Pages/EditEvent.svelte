<script>

  import { inertia } from '@inertiajs/inertia-svelte'
  import EventForm from './../Components/EventForm.svelte';
  import Layout from "../Layout/homelayout.svelte"
  import {
    Inertia
  } from '@inertiajs/inertia'

  export let form = {}
  export let videos = [];

  function handleSubmit() {
    Inertia.put('/event/' + form.id, form)
  }

</script>
<Layout>
  <div slot="subheader">


  </div>
  <div slot="content">
    <div class="">
      <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div class="space-y-12">
          <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
           <div class="flex justify-between">
               <div>
                <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Daftar Video</h2>
                <p class="text-xl text-gray-500">Tambahkan video ke dalam event.</p>
               </div>
               <div>
                   <a class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/event/{form.id}/video/create" use:inertia>Tambah Video</a>
               </div>
           </div>
          </div>
          <div class="mt-5">
            {#if videos.length}
            <ul class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {#each videos as item}
                 <!-- content here -->
                 <a href="/event/{form.id}/video/{item.id}/edit" class="relative">
                  <div
                    class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img src="{item.thumbnail}" alt=""
                      class="object-cover pointer-events-none group-hover:opacity-75"> <button type="button"
                      class="absolute inset-0 focus:outline-none"><span class="sr-only">View details for Hari 1 -
                        UxqzqcxrzK0</span></button></div>
                  <p class="mt-2 block text-sm font-medium   truncate pointer-events-none">{item.title}</p>
                  <p class="block text-sm font-medium text-gray-500 pointer-events-none"> </p>
                      </a> 
              {/each}
              
            </ul>
          
            {:else}
            <a href="/event/{form.id}/video/create" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900"> Tambah Video Baru </span>
            </a>
               <!-- content here -->
            {/if}
          
          </div>
        </div>
      </div>
    </div>
    <form on:submit|preventDefault={handleSubmit}>

      <EventForm bind:form="{form}"></EventForm>
    </form>
  </div>

</Layout>
