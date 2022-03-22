import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' 

export default class UploadFilesController {
    public async upload({request}: HttpContextContract) {
      const coverImage = request.file('file', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })!
      
      await coverImage.moveToDisk('../../public/images')
      
      // Get the name of the saved file; to store it in your database, for example.
      return "/images/"+coverImage.fileName;
    }
}
