<script>
      import {  inertia, Link } from '@inertiajs/inertia-svelte'

      import { Inertia } from '@inertiajs/inertia'
      let values = {
      name: '', 
      email: '',
      password : ''
    }
    let showPass = false


      function handleSubmit() {
        Inertia.post('/login', values) 
    }

</script>
<div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form on:submit|preventDefault={handleSubmit} class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Login</h1> 
            <input 
                type="text"
                bind:value="{values.email}"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email" />

            {#if showPass}
            <input 
            bind:value="{values.password}"
                type="text"
                class="block border border-grey-light w-full p-3 rounded  "
                name="password"
                placeholder="Password" />
            {:else} 
            <input 
            bind:value="{values.password}"
                type="password"
                class="block border border-grey-light w-full p-3 rounded  "
                name="password"
                placeholder="Password" />
            {/if}
            <div class="mb-4 flex justify-between">
                <button class="text-sm text-gray-500" type="button" on:click="{()=>{showPass = !showPass}}">{showPass ? 'Sembunyikan' : "tampilkan"} </button> 
            </div>  
            <button
                type="submit"
                class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Login</button>

             
        </form>

        <div class="text-grey-dark mt-6">
            Belum punya Akun? 
            <a class="no-underline border-b border-blue text-blue" use:inertia href="/register">
                Register
            </a>.
        </div>
    </div>
</div>