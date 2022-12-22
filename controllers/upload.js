const multer = require('multer');
const storagePosts = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploaded/posts/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })  
const storageProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploaded/profile/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})  

const uploadPost = multer({storage: storagePosts}).single("postImage");
const uploadProfile = multer({storage: storageProfile}).single("profileImage");

module.exports = {uploadPost, uploadProfile};
