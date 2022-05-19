var express = require('express');
var router = express.Router();
const connection = require('../connection/connection');
const crypto = require("crypto");
const path = require("path");
const upload = require('../storage/upload');
const {MongoClient} = require('mongodb');
const {GridFSBucket} = require("mongodb");
const Grid = require('gridfs-stream');
const initialMessages = require('../controllers/download')


const dbConfig = require("../config/db");
const url = dbConfig.url;
const baseUrl = "http://localhost:5000/messages/files/";
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});




/* GET users listing. */
router.get('/', async function(req, res, next) {
  let messages = await initialMessages;
  const data = messages;
  res.json(data);
});


router.post('/', async function(req, res, next) {
  let result = await upload(req, res);
  console.log('File uploaded');
  connBody = await connection;
  let { latlng, message, uniqueId } = req.body;
  latlng = JSON.parse(latlng);
  const message1 = ({
    latlng: latlng,
    message: message,
    uniqueId: uniqueId,
  });
  try {
    const insertedMessage = await connBody.db('Messages').collection('messages').insertOne(message1);
    console.log(insertedMessage);
    res.send('Message uploaded')
  } catch (e) {
    console.log(e);
  }
})


router.get('/files', async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.get('/files/:name', async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.imgBucket,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});





module.exports = router;
