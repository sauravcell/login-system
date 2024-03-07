import multer from "multer";

//export const upload = multer({ dest: 'uploads/' })

//other way to upload which maintains the filename same.

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
    cb(null, 'uploads')
    },
    filename: function (request, file, cb) {
      cb(null, file.originalname)
    }
});

export const upload = multer({storage});
