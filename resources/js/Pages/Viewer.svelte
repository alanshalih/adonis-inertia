<script>
import { onMount } from "svelte";
 
import VideoPlayer from "../Components/VideoPlayer.svelte";
import axios from "axios" 
export let event;
export let videos;
export let viewer;
const ws = new WebSocket("ws://127.0.0.1:6543?id="+viewer.id+"&event_id="+viewer.event_id);
ws.addEventListener("message",(data)=>{
console.log(data)
})
let comments = []
let sortBy = "popularity"
let video_id;
let comment_content = ""
let comment_meta = {}
  
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
    
</script>
<div class="bg-black">
    <div class="hidden lg:block">
        <div class="bg-black w-full z-10 flex justify-center"><img class="h-12 py-2 lg:h-20 " src="{event.logo}" alt=""></div>
    </div>
    <div class="bg-black">
        <VideoPlayer {event} {video_id}></VideoPlayer>
    </div>
    <div class="container mx-auto py-5">
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
            <p class="mt-2 block text-sm font-medium text-white truncate pointer-events-none">{item.title}</p> 
          </li>
          {/each}
        
          <!-- More files... -->
        </ul>
       </section>
        <section aria-labelledby="notes-title">
            <div class="bg-black shadow sm:rounded-lg sm:overflow-hidden">
              <div class="px-4  sm:px-6">
                <h2 id="notes-title" class="text-lg font-medium text-gray-300">Komentar</h2>
              </div>
             
              <div class="bg-black px-4 pt-6 pb-2">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="{viewer.gravatar}" alt="">
                  </div>
                  <div class="min-w-0 flex-1">
                    <form  on:submit|preventDefault={submitComment}>
                      <div>
                        <label for="comment" class="sr-only">About</label>
                        <textarea bind:value="{comment_content}" id="comment" name="comment" rows="3" class="shadow-sm bg-black placeholder:text-white text-white block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md" placeholder="Tambahkan Komentar"></textarea>
                      </div>
                      <div class="mt-3 flex items-center justify-between">
                      <div></div>
                        <button  type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="bg-black px-4 pt-6 pb-2">
                <label for="sortby" class="block text-sm font-medium text-gray-200">Sort By</label>
                <select on:change="{loadComment}" bind:value="{sortBy}" id="sortby" name="sortby" class="mt-1 block pl-3 pr-10 py-2 bg-black text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="popularity">Populer</option>
                  <option value="recently">Terkini</option> 
                </select>
              </div>
              <div class="divide-y divide-gray-200">
                
                <div class="px-4 py-6 sm:px-6">
                  <ul   class="space-y-8">
                    {#each comments as item,index}
                       <!-- content here -->
                       <li>
                        <div class="flex space-x-3">
                          <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" src="{item.gravatar}" alt="">
                          </div>
                          <div>
                            <div class="text-sm">
                              <p class="font-medium text-gray-300">{item.name}</p>
                            </div>
                            <div class="mt-1 text-sm text-gray-400">
                              <p>{item.content}</p>
                            </div>
                            <div class="mt-2 text-sm space-x-2">
                              <span class="text-gray-500 font-medium">{item.created_at}</span>
                              <span class="text-gray-500 font-medium">&middot;</span>
                              <button on:click="{()=>{LikeComment(item,index)}}" type="button" class="text-gray-500 font-medium">{item.like} Like</button>
                              <button type="button" class="text-gray-500 font-medium">Reply</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    {/each}
                   
   
                  </ul>
                </div>
              </div>
              
            </div>
          </section> 
   
    </div>
</div>