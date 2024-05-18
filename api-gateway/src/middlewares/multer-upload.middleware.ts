import multer from 'multer';
import AppConfig from "configs/app.config";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, AppConfig.storage.path.upload);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

export default upload;