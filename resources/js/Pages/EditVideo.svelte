<script>  
    import Layout from "../Layout/homelayout.svelte"  
    import { Inertia } from '@inertiajs/inertia'
import VideoForm from "../Components/VideoForm.svelte";
    export let event_id = 0;
  
   export  let form = {  
    }
    export let main_video;

    function handleSubmit(){
        if(main_video)
        {
            form.main_video = main_video;
        }
            Inertia.put('/event/'+event_id+"/video/"+form.id, form,{
                onSuccess : page=>{
                    Inertia.visit('/event/'+event_id+"/edit")
                }
            })
    }
</script>
<Layout>
    <div slot="subheader">
         
 
    </div>
 <div slot="content"  > 
  <form on:submit|preventDefault={handleSubmit} >  
<VideoForm bind:form="{form}" bind:main_video="{main_video}"></VideoForm>
</form>
 </div>
 
</Layout>