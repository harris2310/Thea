const express = require('express');
const Joi = require('joi');

const db = require('../db');

const messages = db.get('messages');

const multer = require('multer');

const path = require("path");




const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

const schema = Joi.object().keys({
  message: Joi.string().alphanum().min(1).max(300),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  imageFile: Joi.file()
});


router.get('/', (req, res) => {
  messages
    .find()
    .then(allMessages => {
      res.json(allMessages);
    });
});

router.get('/uploads', (req, res) => {
  res.sendFile(path.join(__dirname, '../uploads/27458982_2019637464717914_6268087410440412965_n.png'))
})

router.post('/', upload.single('imageFile'), (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const {
      message,
      latitude,
      longitude,
    } = req.body;
    const imageFile = req.file
    const userMessage = {
      message,
      latitude,
      longitude,
      imageFile,
      date: new Date()
    };
    messages
    .insert(userMessage)
    .then(insertedMessage => {
      res.json(insertedMessage);
  });
  } else {
    next(result.error);
  }
});

module.exports = router;
