/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis';
import Ws from 'App/Service/Ws'
Ws.boot()

const url = require('url')

/**
 * Listen for incoming socket connections
 */

let bcViewer = {}
let peakView = {}
setInterval(()=>{
  bcViewer = {}
},5*60000)
 
Ws.io.on('connection',async (socket : any,request) => {  
    // console.log(client)
    // console.log(request.url)

    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);

    // await Redis.sadd("room-"+queryObject.event_id,queryObject.id)
    socket.id = queryObject.id;
    socket.room = queryObject.event_id;

    

    const concurrent = await Redis.incr("concurrent-viewer:"+socket.room)
    await Redis.sadd("viewer_id:"+socket.room,socket.id)
    
    if(peakView[socket.room])
    {
      if(concurrent > peakView[socket.room])
      {
        peakView[socket.room] = concurrent;
        
        const peak = await Redis.get("peak-viewer:"+socket.room);;

        if(peak)
        {
          if(concurrent > parseInt(peak))
          await Redis.set("peak-viewer:"+socket.room,concurrent);
        }else{
          await Redis.set("peak-viewer:"+socket.room,concurrent);
        }
        

      }
    }else{
      peakView[socket.room] = concurrent;
    }

    if(!bcViewer[socket.room])
    {
      bcViewer[socket.room] = true;

      Redis.publish("jam-communication:"+process.env.PORT,JSON.stringify({
        room : socket.room,
        sender_id : socket.id,
        concurrent : concurrent 
      })) 
    }

    socket.send(JSON.stringify({
      room : socket.room,
      concurrent : concurrent 
    }))

    
    
    socket.on('close', async ()=> { 
        await Redis.decr("concurrent-viewer:"+socket.room)
        await Redis.srem("viewer_id:"+socket.room,socket.id)
    });

    

    socket.on('message', function (msg) {  
 
      // broadcast message to all connected clients in the room 
      Redis.publish("jam-communication:"+process.env.PORT,msg.toString()) 
    })

   
  
  
  
      
})  

Redis.subscribe("jam-communication:"+process.env.PORT,(msg)=>{
 
  const message = JSON.parse(msg)
  Ws.io.clients.forEach(function (client : any) {
        if (   client.room == message.room) {  
          client.send(msg); 
        };
    });
})


// if(process.env.NODE_APP_INSTANCE === "0") {
//     // the code in here will only be executed on the first instance in the cluster
//     console.log("master");
// }
  