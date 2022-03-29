<script>
import { onMount } from "svelte";
 
import VideoPlayer from "../Components/VideoPlayer.svelte";
import axios from "axios" 
export let event;
export let videos;
export let viewer;
let concurrent_viewer = 0;

let ws;


let comments = []
let chats = []
let sortBy = "popularity"
let PlayerHeight = 400
let video_id;
let comment_content = ""
let comment_meta = {}
let isFullscreen = false;


function connect() {

    ws = new WebSocket(location.protocol.replace('http','ws')+"//"+location.host+"?id="+viewer.id+"&event_id="+viewer.event_id);
    
    ws.addEventListener("message",(event)=>{
        const data = JSON.parse(event.data)  
        if(data.concurrent)
        {
          concurrent_viewer = data.concurrent;
        }
        if(data.text )
        {
          chats = [...chats,data]
        }
    })

    ws.addEventListener('close', (event) => {
      setTimeout(() => {
        connect();
      }, 60000)
    });

  }
  connect()


  
function SelectVideo(id){
    video_id = id;
  }

  onMount(()=>{
    loadComment()
    
  })

  function loadComment(){
    setTimeout(()=>{
      axios.get("/comment/"+event.id,{params : {sort_by : sortBy}}).then(response=>{
      comments = response.data.data;
      comment_meta = response.data.meta;
    })
    },400)
  }

  function submitComment(){  
    const comment = { 
      content : comment_content,
      event_id : event.id,
      name : viewer.name,
      gravatar : viewer.gravatar, 
    }

    comment_content = ""
    axios.post("/comment/",comment).then(response=>{
      comments = [response.data,...comments]
    })
  }
  function LikeComment(item,index){
   
    if(localStorage.getItem("like-comment-"+item.id) === null)
    axios.post("/like/"+item.id).then(response=>{ 
      comments.splice(index,1,response.data)
      localStorage.setItem("like-comment-"+item.id,"true")
      comments = comments; 
    })
  }

  let chat_text = ""
  function SendChat()
  {
    const data = {
      name : viewer.name,
      sender_id : viewer.id,
      text : chat_text,
      room : event.id,
      gravatar : viewer.gravatar
    }
    ws.send(JSON.stringify(data))
    // chats = [...chats,data]
    chat_text = ""
  }

  const ScreenHeight = window.screen.height;;
    
  let show_comment = false;
</script>
<div class="bg-black">
  {#if !isFullscreen}<div class="hidden lg:block">
    <div class="bg-black w-full z-10 flex justify-center"><img class="h-12 py-2 lg:h-20 " src="{event.logo}" alt=""></div>
</div>
  {/if}
    
    <div class="bg-black flex   {isFullscreen ? '' : ' container mx-auto'}  ">
       <div class="grow ">
        <VideoPlayer bind:PlayerHeight="{PlayerHeight}" bind:isFullscreen="{isFullscreen}" {event} {video_id}></VideoPlayer>
       </div>
       {#if !isFullscreen}
          <!-- content here -->
          <div class="flex-none hidden md:block w-80 relative  bg-gray-900  text-white">
            <div class="w-full  " style="height: {PlayerHeight+32}px;">
              <div class="relative flex items-center p-3 border-b border-gray-700">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="{viewer.gravatar}" alt="username" />
                <span class="block ml-2 font-bold text-gray-600">Chat</span>
                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
              </div>
              <div class="relative w-full text-sm p-3 overflow-y-auto " style="height: {PlayerHeight-100}px;">
                {#each chats as chat}
                   <!-- content here -->
                   <div class=" ">
                    <img src="{chat.gravatar}" class="w-6 h-6 rounded-full inline mr-1" alt="">
                    <span class="text-gray-200 mr-2">{chat.name}</span> <span class="text-gray-400">
                      {chat.text}
                    </span>
                  </div>
                {/each}
               
                 
  
                 
  
              </div>
  
              <div class="absolute bottom-0 flex gap-2 p-2 items-center justify-between w-full  border-t border-gray-700">
  
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button> 
  
                <form on:submit|preventDefault="{SendChat}" class="flex gap-2   w-full">
                  <input type="text" placeholder="Message"
                  class="w-full bg-gray-700" bind:value="{chat_text}"
                  name="message" required />
                 
                <button  type="submit">
                  <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
                </form>
              </div>
            </div>
          </div>
       {/if}
        
       
    </div>
    
    {#if !isFullscreen}
       <!-- content here -->
 
    {#if show_comment }
       <!-- content here -->
       <div>
        <div class="w-full  " style="height: {PlayerHeight+32}px;">
          <div class="flex justify-between border-b border-gray-700">
            <div class="relative flex items-center  p-3 ">
              <img class="object-cover w-10 h-10 rounded-full"
                src="{viewer.gravatar}" alt="username" />
              <span class="block ml-2 font-bold text-gray-600">Chat</span>
              <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
              </span>
            </div>
            <div class="p-3 mt-2">
             <button class="text-gray-300"   on:click="{()=>{show_comment = false;}}"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg></button>
            </div>
          </div>
          <div class="relative w-full text-sm p-3 overflow-y-auto " style="height: {ScreenHeight-PlayerHeight-126}px;">
            {#each chats as chat}
               <!-- content here -->
               <div class=" ">
                <img src="{chat.gravatar}" class="w-6 h-6 rounded-full inline mr-1" alt="">
                <span class="text-gray-200 mr-2">{chat.name}</span> <span class="text-gray-400">
                  {chat.text}
                </span>
              </div>
            {/each}
           
             
  
             
  
          </div>
  
          <div class="absolute bottom-0 flex gap-2 p-2 items-center justify-between w-full  border-t border-gray-700">
  
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button> 
  
            <form on:submit|preventDefault="{SendChat}" class="flex gap-2   w-full">
              <input  type="text" placeholder="Message"
              class="w-full bg-gray-700 text-gray-300" bind:value="{chat_text}"
              name="message" required />
             
            <button  type="submit">
              <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
            </form>
          </div>
        </div>
      </div>
    {:else}
    <div class="container p-2 mx-auto">
      <section class="mb-6  md:-mt-10 ">
        <div class="text-gray-200 md:text-xl">
         {event.title}
        </div>
        <div>
          <p class="text-gray-400 text-sm md:text-lg">{concurrent_viewer} orang sedang menonton</p>
        </div>
       </section>
      <section class="mb-7 md:hidden" id="switch-to-comment">
        <div class="">
          <input type="text" on:click="{()=>{show_comment = true;}}" readonly   placeholder="Send Message"
          class="w-full bg-gray-900"  
          name="message"   /> 
        </div>
      </section>
      <section id="other-video" >
        <ul   class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {#each videos as item}
             <!-- content here -->

         
          <li class="relative">
            <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img src="{item.thumbnail}" alt="" class="object-cover pointer-events-none group-hover:opacity-75">
              <button type="button" on:click="{()=>{SelectVideo(item.video_id)}}" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for Hari 1 - UxqzqcxrzK0</span>
              </button>
            </div>
            <p class="mt-2 block text-sm font-medium text-gray-200 truncate pointer-events-none">{item.title}</p> 
          </li>
          {/each}
        
          <!-- More files... -->
        </ul>
       </section>
    </div>
    {/if}
    {/if}
    
    
     
</div>