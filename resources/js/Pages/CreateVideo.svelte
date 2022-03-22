<script>  
    import Layout from "../Layout/homelayout.svelte"  
    import { Inertia } from '@inertiajs/inertia'
import VideoForm from "../Components/VideoForm.svelte";
    export let event_id = 0;
  
    let form = { 
        video_id : '',
        title : '',
        thumbnail : ''
    }

    function handleSubmit(){
            Inertia.post('/event/'+event_id+"/video", form)
    }
</script>
<Layout>
    <div slot="subheader">
         

    </div>
 <div slot="content"  > 
  <form on:submit|preventDefault={handleSubmit} >  
<VideoForm bind:form="{form}"></VideoForm>
</form>
 </div>
 
</Layout>