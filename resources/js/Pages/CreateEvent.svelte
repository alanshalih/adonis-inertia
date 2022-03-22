<script> 
	import EventForm from './../Components/EventForm.svelte';
    import Layout from "../Layout/homelayout.svelte"  
    import { Inertia } from '@inertiajs/inertia'
  
    let form = {
      title: '', 
      slug: '',
      logo : '',
      description : '',
      thumbnail : '',
      social_share_title : '',
      social_share_subtitle : '', 
      show_name : true,
      show_email : true,
      show_phone : true,
      id_identifier : "phone"
    }

    function handleSubmit(){
            Inertia.post('/event', form)
    }
</script>
<Layout>
    <div slot="subheader">
         

    </div>
 <div slot="content"  >
  <form on:submit|preventDefault={handleSubmit} > 
  <EventForm bind:form="{form}"></EventForm>
</form>
 </div>
 
</Layout>