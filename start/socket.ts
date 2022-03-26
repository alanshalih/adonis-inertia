/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Ws from 'App/Service/Ws'
Ws.boot()

const url = require('url')

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket,request) => {  
    // console.log(client)
    // console.log(request.url)
    // socket.on('message', function message(data) {
    //     console.log(`Received message ${data} from user ${client}`);
    //   });
    const queryObject = url.parse(request.url, true).query;
    console.log(queryObject);
    
    socket.on('close', function close() {
        console.log('disconnected');
      });
     
      
})  

// if(process.env.NODE_APP_INSTANCE === "0") {
//     // the code in here will only be executed on the first instance in the cluster
//     console.log("master");
// }
  