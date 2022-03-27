<script>
	import Optin from './Guest/Optin.svelte';
    import Viewer from './Guest/Viewer.svelte';
    let path = location.pathname;
    let event = window.event;
    let videos = window.videos;
    let viewer = window.viewer;


</script>
{#if path.includes("view")}
<Viewer  {event} {viewer} {videos}></Viewer>
{:else}
<Optin {event}></Optin>
{/if}
