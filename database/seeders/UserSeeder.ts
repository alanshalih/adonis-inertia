import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
const crypto = require('crypto')

export default class UserSeederSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    console.log("fill user data")
    const password = Math.random().toString(36).slice(-8);
    let data = {
      name : process.env.FIRST_USER_NAME,
      email : process.env.FIRST_USER_EMAIL,
      password : password,
      gravatar :  "https://www.gravatar.com/avatar/"+crypto.createHash('md5').update(process.env.FIRST_USER_EMAIL).digest('hex')
    }
    data.password =  await Hash.make(data.password);
    await User.create(data)
    console.log(data.email)
    console.log(password)
  }
}
