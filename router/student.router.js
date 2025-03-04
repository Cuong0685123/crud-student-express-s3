import express from 'express';
import { crStudent, deleteStudent, readStudentbyId, updateStudent } from '../controller/student.controllers.js';
import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import { configDotenv } from 'dotenv';


configDotenv();

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, 'uploads/' + Date.now().toString() + '-' + file.originalname);
  },
});

// move code from line 9 to line 29 of file s3.config.js

const router = express.Router();
const upload = multer({ storage });


router.post('/',upload.single("avatar"), crStudent);
// router.get('/:studentId/student', readStudentbyId); naming router failed
router.get('/:studentId', readStudentbyId);
router.delete('/:studentId', deleteStudent);
router.patch('/:studentId',upload.single("avatar"), updateStudent);
export default router;