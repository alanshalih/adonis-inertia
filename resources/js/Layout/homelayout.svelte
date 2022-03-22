
      <script>

import { page } from '@inertiajs/inertia-svelte'
        import {onMount} from "svelte"
        
        onMount(()=>{
          let sideBar = document.getElementById("mobile-nav"); 
           sideBar = document.getElementById("mobile-nav");
        sideBar.style.transform = "translateX(-100%)"; 
        })
        
        
                        function dropdownHandler( ) {  
            let single = document.querySelector("#dropdownmenu"); 
            single.classList.toggle("hidden");
        }
        function MenuHandler(el, val) {
            let MainList = el.parentElement.getElementsByTagName("ul")[0];
            let closeIcon = el.parentElement.getElementsByClassName("close-m-menu")[0];
            let showIcon = el.parentElement.getElementsByClassName("show-m-menu")[0];
            if (val) {
                MainList.classList.remove("hidden");
                el.classList.add("hidden");
                closeIcon.classList.remove("hidden");
            } else {
                showIcon.classList.remove("hidden");
                MainList.classList.add("hidden");
                el.classList.add("hidden");
            }
        }
        
        
        const sidebarHandler = (check) => {
          let sideBar = document.getElementById("mobile-nav");
          let menu = document.getElementById("menu"); 
          let cross = document.getElementById("cross");
            if (check) {
                sideBar.style.transform = "translateX(0px)";
                menu.classList.add("hidden");
                cross.classList.remove("hidden");
            } else {
                sideBar.style.transform = "translateX(-100%)";
                menu.classList.remove("hidden");
                cross.classList.add("hidden");
            }
        };
        
        const listHandler = (check) => {
          let list = document.getElementById("list");
        let chevrondown = document.getElementById("chevrondown");
        let chevronup = document.getElementById("chevronup");
        
        
            if (check) {
                list.classList.remove("hidden");
                chevrondown.classList.remove("hidden");
                chevronup.classList.add("hidden");
            } else {
                list.classList.add("hidden");
                chevrondown.classList.add("hidden");
                chevronup.classList.remove("hidden");
            }
        };
        
        const listHandler2 = (check) => {
          
        let list2 = document.getElementById("list2");
        let chevrondown2 = document.getElementById("chevrondown2");
        let chevronup2 = document.getElementById("chevronup2");
        
            if (check) {
                list2.classList.remove("hidden");
                chevrondown2.classList.remove("hidden");
                chevronup2.classList.add("hidden");
            } else {
                list2.classList.add("hidden");
                chevrondown2.classList.add("hidden");
                chevronup2.classList.remove("hidden");
            }
        };
              </script>
              <div class="h-full w-full absolute">
                  <!-- Navigation starts -->
                  <!-- Mobile -->
                  <div id="mobile-nav" class="w-full xl:hidden h-full absolute z-40">
                      <div class="bg-gray-800 opacity-50 inset-0 fixed w-full h-full" on:click="{()=>{sidebarHandler(false)}}"></div>
                      <div class="w-64 z-20 absolute left-0 z-40 top-0 bg-white shadow flex-col justify-between transition duration-150 ease-in-out h-full">
                          <div class="flex flex-col justify-between h-full">
                              <div class="px-6 pt-4 overflow-y-auto">
                                  <div class="flex items-center justify-between">
                                      <div aria-label="Home"  class="flex items-center">
                                          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg" alt="logo">
                                          <p class="text-bold md:text2xl text-base pl-3 text-gray-800">The North</p>
                                      </div>
                                      <button id="cross" class="hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded" on:click="{()=>{sidebarHandler(false)}}">
                                          <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg2.svg" alt="cross">
                                      </button>
                                  </div>
                                  <ul class="f-m-m">
                                      <li class="text-white pt-8">
                                          <div class="flex items-center">
                                              <div class="md:w-6 md:h-6 w-5 h-5">
                                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                                                      <path d="M7.16667 3H3.83333C3.3731 3 3 3.3731 3 3.83333V7.16667C3 7.6269 3.3731 8 3.83333 8H7.16667C7.6269 8 8 7.6269 8 7.16667V3.83333C8 3.3731 7.6269 3 7.16667 3Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M7.16667 11.6667H3.83333C3.3731 11.6667 3 12.0398 3 12.5V15.8333C3 16.2936 3.3731 16.6667 3.83333 16.6667H7.16667C7.6269 16.6667 8 16.2936 8 15.8333V12.5C8 12.0398 7.6269 11.6667 7.16667 11.6667Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M16.1667 11.6667H12.8333C12.3731 11.6667 12 12.0398 12 12.5V15.8334C12 16.2936 12.3731 16.6667 12.8333 16.6667H16.1667C16.6269 16.6667 17 16.2936 17 15.8334V12.5C17 12.0398 16.6269 11.6667 16.1667 11.6667Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                      <path d="M16.1667 3H12.8333C12.3731 3 12 3.3731 12 3.83333V7.16667C12 7.6269 12.3731 8 12.8333 8H16.1667C16.6269 8 17 7.6269 17 7.16667V3.83333C17 3.3731 16.6269 3 16.1667 3Z" stroke="#667EEA" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                                  </svg>
                                              </div>
                                              <a href="/" class="text-indigo-500 ml-3 text-lg">Dashboard</a>
                                          </div>
                                      </li>
                                       
                                  </ul>
                              </div>
                              <div class="w-full">
                                  <div class="flex justify-center mb-4 w-full px-6">
                                      <div class="relative w-full">
                                          <div class="text-gray-600 absolute ml-4 inset-0 m-auto w-4 h-4">
                                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg3.svg" alt="search">
                                          </div>
                                          <input class="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 placeholder-gray-600 bg-gray-100 pl-10 py-2" type="text" placeholder="Search" />
                                      </div>
                                  </div>
                                  <div class="border-t border-gray-300">
                                      <div class="w-full flex items-center justify-between px-6 pt-1">
                                          <div class="flex items-center">
                                              <img alt="display avatar"  src="{$page.props.user.gravatar}" class="w-8 h-8 rounded-md" />
                                              <p class="text-gray-800 text-base leading-4 ml-2">{$page.props.user.name}</p>
                                          </div>
                                          <ul class="flex">
                                              <li class="cursor-pointer text-white pt-5 pb-3">
                                                  <a href="/"> 
                                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg5.svg" alt="message">
                                                  </a>
                                              </li>
                                              <li class="cursor-pointer text-white pt-5 pb-3 pl-3">
                                                  <a href="/"> 
                                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg6.svg" alt="notifications">
                                                  </a>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- Mobile -->
                  <nav class="w-full mx-auto bg-white shadow">
                      <div class="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
                          <div class="h-full flex items-center">
                              <div aria-label="Home"  class="mr-10 flex items-center">
                                  <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg1.svg" alt="logo">
                                  <h3 class="text-base text-gray-800 font-bold tracking-normal leading-tight ml-3 hidden lg:block">DripJam</h3>
                              </div>
                              <ul class="pr-12 xl:flex items-center h-full hidden">
                                  <li class="hover:text-indigo-700 cursor-pointer h-full flex items-center text-sm text-indigo-700 tracking-normal border-b-2 border-indigo-700"><a href="/"> Dashboard</a></li>
                                
                              </ul>
                          </div>
                          <div class="h-full xl:flex items-center justify-end hidden">
                              <div class="w-full h-full flex items-center">
                                  
                                  <div class="w-full h-full flex">
                                       
                                      <div aria-haspopup="true" class="cursor-pointer w-full flex items-center justify-end relative"  >
                                          <button aria-haspopup="true" on:click="{dropdownHandler}" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded flex items-center" >
                                              <img class="rounded-full h-10 w-10 object-cover" src="{$page.props.user.gravatar}" alt="avatar" />
                                              <p class="text-gray-800 text-sm ml-2">{$page.props.user.name}</p>
                                          </button>
                                          <ul id="dropdownmenu" class="p-2 w-40 border-r bg-white absolute rounded z-40 left-0 shadow mt-64 hidden ">
                                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                  <div class="flex items-center">
                                                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                          <path stroke="none" d="M0 0h24v24H0z" />
                                                          <circle cx="12" cy="7" r="4" />
                                                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                      </svg>
                                                      <a href="/" class="ml-2">My Profile</a>
                                                  </div>
                                              </li>
                                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex items-center">
                                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" />
                                                      <circle cx="12" cy="12" r="9" />
                                                      <line x1="12" y1="17" x2="12" y2="17.01" />
                                                      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
                                                  </svg>
                                                  <a href="/" class="ml-2">Help Center</a>
                                              </li>
                                              <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                      <path stroke="none" d="M0 0h24v24H0z" />
                                                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                      <circle cx="12" cy="12" r="3" />
                                                  </svg>
                                                  <a href="/" class="ml-2">Account Settings</a>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="visible xl:hidden flex items-center">
                              <div>
                                  <button id="menu" class="text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" on:click="{()=>{sidebarHandler(true)}}">
                                      <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_Grey_background-svg7.svg" alt="toggler">
                                  </button>
                              </div>
                          </div>
                      </div>
                  </nav>
                  <!-- Navigation ends -->
                  <!-- Page title starts -->
                  <slot name="subheader"></slot>
                  
                  <!-- Page title ends -->
                  <div class="container mx-auto px-6">
                     <slot name="content"></slot>
                  </div>
              </div>
              
              
          