const mailjet = require ('node-mailjet')
.connect('19204cd5a9a5aa33fb41bb0db40b8a60', 'd595c3d150c9dc3444284ad7fd93c9a4')

export default function(config){
    
const request = mailjet
.post("send", {'version': 'v3.1'})
.request(config)

request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

} 
