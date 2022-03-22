<script>
	import Homelayout from './../Layout/homelayout.svelte';
    import { onMount } from "svelte";
    
     
    
    
       function mobileAndTabletCheck() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    
        let config = {
      height: '390',
      width: '640',
      videoId: 'qBeAUyuctHM',
      playerVars: {
        'controls': 0
      }
    }
    export let event;
    export let video_id;
    config.videoId = event.video_id;
    
      config.events =  { 
          'onStateChange': onPlayerStateChange,
          'onReady': onPlayerReady,
        }
    
        let playButton = true;
        let ready = false;
        let toolbar = false;
        let PlayerWidth  = config.width;
        let PlayerHeight = config.height;
        let isFullscreen = false;
        let rotate = false;
    
    
        onMount(()=>{
        const offsetWidth = document.querySelector('#check-width').offsetWidth
        config.width = offsetWidth;
        config.height = Math.floor(offsetWidth / 16 * 9)
          PlayerWidth  = config.width;
          PlayerHeight = config.height;
    
          window.addEventListener("orientationchange", function() {
         
            if(isFullscreen)
            { 
    
          isFullscreen = true;
          PlayerWidth = window.screen.width;
          PlayerHeight = window.screen.height; 
    
          player.setSize(PlayerWidth,PlayerHeight)
    
            }else{
              const iframe = document.querySelector('iframe');
            iframe.style.width = '100%';
            setTimeout(()=>{
              const offsetWidth = document.querySelector('iframe').offsetWidth  
        config.width = offsetWidth;
        config.height = Math.floor(offsetWidth / 16 * 9)
          PlayerWidth  = config.width;
          PlayerHeight = config.height;
          player.setSize(PlayerWidth,PlayerHeight)
            },200)
            }
            
        
          
    }, false);
      
      })
    
      function onPlayerReady(){
        ready = true;
      }
    
        function onPlayerStateChange(event){
          if (event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.BUFFERING) {
            playButton = false;
            }else{
              playButton = true;
              toolbar = true;
            }
        }
      
      let player;
      let randomId = (Math.random() + 1).toString(36).substring(7);
    
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
    
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      
      let persentageVideo = 0;
      window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player(randomId, config);
    
        setInterval(()=>{
          
          if(!playButton)
          {
            // console.log(player.getCurrentTime())
            // console.log(player.getDuration())
            persentageVideo = Math.floor(player.getCurrentTime()/player.getDuration()*100)
            // console.log(persentageVideo)
          }
        },1000)
        
    
        document.addEventListener('fullscreenchange', (event)=>{
          if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            ///fire your event
            isFullscreen = false;
          PlayerWidth = config.width;
        PlayerHeight = config.height;
        document.exitFullscreen();
        player.setSize(PlayerWidth,PlayerHeight)
        }
        });
    
     
    
       
    
      }
    
     
      function playVideo(){
        player.playVideo();
      }
    
      function playOrPause(){
        if(playButton == false)
        {
          player.pauseVideo()
        }else{
          player.playVideo()
        }
      }
      function seekProgress(e){
        const Duration  = player.getDuration();
        const result =  (e.layerX /   e.target.offsetWidth * Duration)
     
        player.seekTo(result,true)
        persentageVideo = Math.floor(result/Duration*100)
      }
      
      
    
      function makeFullScreen(){
        if(isFullscreen)
        {
          isFullscreen = false;
          PlayerWidth = config.width;
        PlayerHeight = config.height;
        document.exitFullscreen();
        }else{
    
          document.body.requestFullscreen();
    
          isFullscreen = true;
          PlayerWidth = window.screen.width;
          PlayerHeight = window.screen.height;
          
          if(mobileAndTabletCheck() && PlayerHeight > PlayerWidth)
          {
            PlayerHeight = window.screen.height - 20;
          }
       
        } 
        player.setSize(PlayerWidth,PlayerHeight)
    
      }
    
      let triggerTime = 0;
      setInterval(()=>{
        
        if(!playButton)
        {
          if(triggerTime <= 0)
          {
            toolbar = false;
          }
          
          triggerTime-=100;
        }
        
      },100)

      $ : if(video_id)
      {
        player.loadVideoById(video_id)
      }
    
    </script>
    
   <div class="bg-black"> 
    <div id="check-width"  class="relative bg-black    {isFullscreen ? '' : 'xl:container mx-auto'}      {rotate ? '  ' : ''}" style=" height : {PlayerHeight}px" >
        <div class=" absolute " id="{randomId}"></div>
        <div class="absolute z-10 "  on:mousemove="{()=>{toolbar = true;triggerTime = 3000}}"  on:mouseleave="{()=>{toolbar = false;}}" style="width : {PlayerWidth}px; height : {PlayerHeight}px">
             
          <div class="flex justify-center  "   on:click="{playOrPause}" style="height: {Math.floor(PlayerHeight)}px;{playButton && ready ? 'background: linear-gradient(black, rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0), black, black)' : ''};
      ">  
            {#if playButton}
               <!-- content here -->
               <button on:click="{playVideo}"  class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            {/if}
          
          </div>
          {#if toolbar}
          <div class="absolute   w-full bottom-0 left-0 z-20">
            <div class="flex p-3 gap-2">
              {#if playButton}
                 <!-- content here -->
               
              <div><button on:click="{playVideo}" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button></div>
              {:else}
              <div><button on:click="{playOrPause}" class="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button></div>
              
              {/if}
            
              <div class="w-full cursor-pointer  rounded-full h-2 mt-2 relative" >
                <div class="bg-gray-200 absolute h-2 rounded-full opacity-25  w-full"  ></div>
                
                <div class="bg-blue-600 absolute h-2 rounded-full  " style="width: {persentageVideo}%"></div>
                <div class="w-full absolute   h-2" on:click="{seekProgress}"></div>
              </div>
              
              <div>
                <button class="text-white" on:click="{makeFullScreen}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/if}
          
        </div>
      
      
      </div>
       
   </div>