import Redis from '@ioc:Adonis/Addons/Redis';
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'; 
import Env from '@ioc:Adonis/Core/Env' 
import User from 'App/Models/User';
import SendEmail from "../../Service/Email"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const crypto = require('crypto')

const {OAuth2Client} = require('google-auth-library');
export default class AuthController {

    public async register ({request,auth,response,session}: HttpContextContract) {

        const user = request.only(["email","password","name","id","gravatar"]);

        user.email = user.email.toLowerCase()

        user.gravatar = "https://www.gravatar.com/avatar/"+crypto.createHash('md5').update(user.email).digest('hex');



        var data =  await User.query().where("email",user.email).first()

        if(data)
        {
           session.flash('errors', "Email telah digunakan")

            return response.redirect().back()
 
        }
 


        
        user.password = await Hash.make(user.password)
  
        let Newuser = await User.create(user);

        await auth.use('web').login(Newuser)
        
        return response.redirect('/')
    }

    public async registerFromLP ({request,auth,response}: HttpContextContract) {

        const user = request.only(["email","password","name","id"]);

        user.email = user.email.toLowerCase()

        var data =  await User.query().where("email",user.email).first()

        if(data)
        {
            return response.abort("Email telah digunakan",409);
        }

        user.id = uuidv4(); 
         

        user.password = await Hash.make(user.password)
  
        await User.create(user);

        await auth.use('web').loginViaId(user.id.toString())  
        
         
        return response.redirect("/whatsapp");
    }

    private   extractEmails (text) {
      return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }

    public async registerFromWA({request}: HttpContextContract) {
      
      const message = request.input("message");

      let string = message.conversation;

      const key = request.input("key"); 

      const phone = key.remoteJid.split("@")[0];

      if(!string && message.extendedTextMessage)
      {
         string = message.extendedTextMessage.text
      }
      
       const emails = this.extractEmails(string);
       
       if(emails)
       {
        var data =  await User.query().where("email",emails[0]).first()

        if(data)
        {
          
          
          // balas email telah digunakan
          const text = `Maaf, email ${emails[0]} telah digunakan, silakan registrasi dengan email lainnya`;

          axios.post("http://api.dripsender.id/send",{
            api_key : "8026226b-28c5-40b4-910a-eda2d3804bc8",
            text : text,
            phone
          })


 
        }else{

          const plainPass = (Math.random() + 1).toString(36).substring(2);

          const pass =  await Hash.make(plainPass);
         
          let user = {
           id : uuidv4(),
           name : request.input("pushName"),
           email : emails[0],
           password : pass
         };

      


         await User.create(user);

        //  send notif ke wa
         const code = uuidv4();
 

         await Redis.setex("reset-password:"+code,3600*24*5,user.id);

        //  kirim pesan ke wa...

        const text = `Selamat ${user.name} 🤝🏻 
        
anda berhasil mendaftar di dripsender. silakan klik link berikut untuk membuat password baru

https://app.dripsender.id/make-password/${code}
        `;
        
                 axios.post("http://api.dripsender.id/send",{
                    api_key : "8026226b-28c5-40b4-910a-eda2d3804bc8",
                    text : text,
                    phone
                  })






      

 


        }

       }

       return 'ok';
    }
    

    

    public async logout({auth,response}: HttpContextContract) {
      
        await auth.use('web').logout()
        return response.redirect("/login")
    }

    

    public async login ({request,auth,response,session}: HttpContextContract) {
 
        const email = request.input('email').toLowerCase()

        const password = request.input('password') 
 
        var user =  await User.query().where("email",email).first()

        if(!user)
        { 
 
            session.flash('errors', "Email tidak ada")

            return response.redirect().back()
        }

        if (!(await Hash.verify(user.password, password))) { 

          session.flash('errors', "Invalid credentials")

     return response.redirect().back()
     }
        
        
          // Create session
          await auth.use('web').login(user)
 


        return response.redirect('/');;
    }

    
   

    public async resetpassword ({request,response,session}: HttpContextContract) {
        const email = request.input('email').toLowerCase() 

        // Lookup user manually
        var user =  await User.query().where("email",email).first()

        // Verify password
       
        if(user)
        {
            let code = Math.random().toString(36).substr(3,35);

            await Redis.setex("reset-password:"+code,3600,user.id);
            
            const html = await View.render('email/forgot-password', {
                name: user.name,
                unsubscribe_url : Env.get('APP_URL')+'/unsubscribe',
                RESET_URL : Env.get('APP_URL')+'/reset-password/'+code
              })
 

              SendEmail({
                "Messages":[
                  {
                    "From": {
                      "Email": "arief@app.dripsender.id",
                      "Name": "Arief - Dripsender"
                    },
                    "To": [
                      {
                        "Email": user.email,
                        "Name": user.name
                      }
                    ],
                    "Subject": "Reset Password Drip", 
                    "HTMLPart": html
                  }
                ]
              })

              session.flash("message","Link Reset Password dikirim ke Email anda")
              return response.redirect().back()
        }else{
          session.flash("errors","Email tidak ditemukan")
            return   response.redirect().back()
        }

       
    }

    public async sendVerification ({auth, response,session}: HttpContextContract) {
 

        // Lookup user manually
        

        // Verify password
       
        if(auth.user)
        {
            var user = auth.user;
            

            await Redis.setex("verifikasi-user:"+user.id,3600,user.id);
            
            const html = await View.render('email/send-verification', {
                name: user.name,
                VERIFICATION_URL : Env.get('APP_URL')+'/verify-user/'+user.id
              })
              

              SendEmail({
                "Messages":[
                  {
                    "From": {
                      "Email": "arief@app.dripsender.id",
                      "Name": "Arief - Dripsender"
                    },
                    "To": [
                      {
                        "Email": user.email,
                        "Name": user.name
                      }
                    ],
                    "Subject": "Aktifkan Akun Anda", 
                    "HTMLPart": html
                  }
                ]
              })
              session.flash('message', 'Email Verifikasi telah dikirim') 
              return  response.redirect().back()

        }else{
           session.flash('errors', 'User tidak ditemukan') 
              return  response.redirect().back()
        }

       
    }

          public async registerOrLoginGoogleAuth ({request, response,auth,session}: HttpContextContract) {


              if(!request.input('idToken'))
              {
                session.flash('errors', "ID Token tidak ada")

            return response.redirect().back()
 
              }

              try {

                const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
            const client = new OAuth2Client(CLIENT_ID);
              const ticket = await client.verifyIdToken({
                  idToken: request.input('idToken'),
                  audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                  // Or, if multiple clients access the backend:
                  //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
              });
              const googleuser = ticket.getPayload(); 

              let GetUser = await User.query().where("email",googleuser.email).first()
  
                if(GetUser)
                {
                  
                    
                    await auth.use('web').loginViaId(GetUser.id.toString())
  
                    return 'ok'

                }else{
                    
                    let user = {
                        id : uuidv4(),
                        name : googleuser.name,
                        email : googleuser.email,
                        is_verified : true,
                        password : Math.random().toString(26)
                    }; 

                    user.password = await Hash.make(user.password)
              
                    await User.create(user);
            

                    await auth.use('web').loginViaId(user.id.toString())   

                    return 'ok'
            
                }

                
              } catch (error) {
                 return response.redirect().back()
              }

            
 

          }



    

    

    

    public async verifyReset ({params,response,view}: HttpContextContract) {
    
 

        // Verify password
       
        if(params.id)
        {
           

            const id = await Redis.get("reset-password:"+params.id);
            
            if(id)
            {

                return view.render("auth/verify-password",{id : params.id})
            }else{
                return   response.badRequest('Cridential Not Found');
            }
        }else{
            return   response.badRequest('Cridential Not Found');
        }

       
    }

    public async makePassword ({request,response,auth,session}: HttpContextContract) {
    
 

        // Verify password
       
        if(request.input('id'))
        {
           

            const user_id = await Redis.get("reset-password:"+request.input('id'));
            
            if(user_id)
            {
                const user = await User.find(user_id)

                if(user)
                { 
                    user.password = await Hash.make(request.input('password'));
                    
                    user.save();

                    await auth.use('web').loginViaId(user.id)

                    await Redis.del("reset-password:"+request.input('id'))


                    session.flash("message","reset password berhasil")
                    
                    return response.redirect('/whatsapp');
                }else{
                    return   response.badRequest('Cridential Not Found');
                }
            }else{
                return   response.badRequest('Cridential Not Found');
            }
        }else{
            return   response.badRequest('Cridential Not Found');
        }

       
    }
 
 
    
}
