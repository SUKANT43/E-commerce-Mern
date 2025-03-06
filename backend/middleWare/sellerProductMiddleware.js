const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
