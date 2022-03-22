<script>
import VideoPlayer from "../Components/VideoPlayer.svelte";

export let event;
export let videos;
export let viewer;
  function SelectVideo(){

  }
    
</script>
<div class="bg-black">
    <div class="hidden lg:block">
        <div class="bg-black w-full z-10 flex justify-center"><img class="h-12 py-2 lg:h-20 " src="{event.logo}" alt=""></div>
    </div>
    <div class="bg-black">
        <VideoPlayer {event}></VideoPlayer>
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
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-5 sm:px-6">
                  <h2 id="notes-title" class="text-lg font-medium text-gray-300">Komentar</h2>
                </div>
                <div class="px-4 py-6 sm:px-6">
                  <ul   class="space-y-8">
                    <li>
                      <div class="flex space-x-3">
                        <div class="flex-shrink-0">
                          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </div>
                        <div>
                          <div class="text-sm">
                            <a href="/" class="font-medium text-gray-300">Leslie Alexander</a>
                          </div>
                          <div class="mt-1 text-sm text-gray-400">
                            <p>Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.</p>
                          </div>
                          <div class="mt-2 text-sm space-x-2">
                            <span class="text-gray-500 font-medium">4d ago</span>
                            <span class="text-gray-500 font-medium">&middot;</span>
                            <!-- <button type="button" class="text-gray-500 font-medium">Reply</button> -->
                          </div>
                        </div>
                      </div>
                    </li>
   
                  </ul>
                </div>
              </div>
              <div class="bg-black px-4 py-6 sm:px-6">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="{viewer.gravatar}" alt="">
                  </div>
                  <div class="min-w-0 flex-1">
                    <form action="#">
                      <div>
                        <label for="comment" class="sr-only">About</label>
                        <textarea id="comment" name="comment" rows="3" class="shadow-sm bg-black placeholder:text-white text-white block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md" placeholder="Tambahkan Komentar"></textarea>
                      </div>
                      <div class="mt-3 flex items-center justify-between">
                      <div></div>
                        <button type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section> 
   
    </div>
</div>