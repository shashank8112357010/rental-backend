import multer  from 'multer'
import path from 'path'
import  { v4 as uuidv4 } from  'uuid'

let storage = multer.diskStorage({
  destination: './rental_uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'))
  }
}
const maxSize = 5 * 1024 * 1024; // Limit each file to 5 MB

export default  multer({ storage, fileFilter , limits: {
  fileSize: maxSize, // Limit file size
}, })
