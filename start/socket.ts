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
 

// const url = require('url')

// /**
//  * Listen for incoming socket connections
//  */

// Ws.io.on('connection', (ws) => {


//   ws.room = [];

//   ws.send(JSON.stringify({
//     msg: "user joined"
//   }));

//   console.log('connected');

//   ws.on('message', message => {
//     console.log('message: ', message);
//     //try{
//     var messag = JSON.parse(message);
//     //}catch(e){console.log(e)}
//     if (messag.join) {
//       ws.room.push(messag.join)
//     }

//     if (messag.room) {
//       broadcast(message);
//     }
//     if (messag.msg) {
//       console.log('message: ', messag.msg)
//     }
//   })

//   ws.on('error', e => console.log(e))
//   ws.on('close', (e) => console.log('websocket closed' + e))

// })

// function broadcast(message) {
//   Ws.io.clients.forEach(client => {
//     if (client.room.indexOf(JSON.parse(message).room) > -1) {
//       client.send(message)
//     }
//   })
// }

// // if(process.env.NODE_APP_INSTANCE === "0") {
// //     // the code in here will only be executed on the first instance in the cluster
// //     console.log("master");
// // }
