
const imageKit = require('../utils/imagekit');
const User = require('../models/userschema');

async function uploadFile(req, res) {
  try {
   return  result = await imageKit.upload({
      file: req.files.image.data, // base64 encoded image
      fileName: req.files.image.name // required
    });

  } catch (error) {
  return  console.error("Error uploading file:", error);
  }
}



module.exports = uploadFile;