<script>
    import {  inertia, Link, useForm } from '@inertiajs/inertia-svelte' 
     
    import {generatePassword} from "../Components/helper"
  
    let form = useForm({
      name: '', 
      email: '',
      password : ''
    })
    let showPass = false

    let confirmPass = ""
  
    async function handleSubmit() {
        if($form.password == confirmPass)
        {
            //    Inertia.post('/register', form).then(res=>{
            //        console.log(res)
            //    })
            $form.post('/register', {
  preserveScroll: true, 
  onSuccess: (res) => {
      console.log(res)
  },
  onError:(res)=>{
      console.log(res)
  }
})
           
        }else{
            alert("password tidak cocok")
        }
     
    }

    
  </script>
<div class="bg-gray-100 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form on:submit|preventDefault={handleSubmit} class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>
            <input 
                type="text"
                bind:value="{$form.name}"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Full Name" />

            <input 
                type="text"
                bind:value="{$form.email}"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email" />

            {#if showPass}
            <input 
            bind:value="{$form.password}"
                type="text"
                class="block border border-grey-light w-full p-3 rounded  "
                name="password"
                placeholder="Password" />
            {:else} 
            <input 
            bind:value="{$form.password}"
                type="password"
                class="block border border-grey-light w-full p-3 rounded  "
                name="password"
                placeholder="Password" />
            {/if}
            <div class="mb-4 flex justify-between">
                <button class="text-sm text-gray-500" type="button" on:click="{()=>{showPass = !showPass}}">{showPass ? 'Sembunyikan' : "tampilkan"} </button>
                <button class="text-sm text-gray-500"  type="button" on:click="{()=>{$form.password = generatePassword();confirmPass = $form.password}}">Generate  </button>
            </div> 
            <input 
            bind:value="{confirmPass}"
                type="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password" />

            <button
                type="submit"
                class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>

            <div class="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the 
                <a class="no-underline border-b border-grey-dark text-grey-dark" href="/">
                    Terms of Service
                </a> and 
                <a class="no-underline border-b border-grey-dark text-grey-dark" href="/">
                    Privacy Policy
                </a>
            </div>
        </form>

        <div class="text-grey-dark mt-6">
            Already have an account? 
            <a class="no-underline border-b border-blue text-blue" use:inertia href="/login">
                Log in
            </a>.
        </div>
    </div>
</div>