const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const PDF = require('../models/pdf');
const config = require('../config/config');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { doctorId } = req.body;

  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: `${doctorId}/${file.originalname}`,
    Body: file.buffer,
  };

  try {
    const data = await s3.upload(params).promise();
    const pdf = new PDF({ doctorId, filePath: data.Location });
    await pdf.save();
    res.status(201).send({ message: 'File uploaded successfully', data: data.Location });
  } catch (error) {
    res.status(500).send({ error: 'File upload failed' });
  }
});

module.exports = router;
