var express = require('express');
var router = express.Router();
const connection = require('../connection/connection');
const dbConfig = require("../config/db");
const {MongoClient} = require('mongodb');
const url = dbConfig.url;
const baseUrl = "http://localhost:5000/messages/files/";


const mongoClient = new MongoClient(url, {useUnifiedTopology: true});


let conn, connImages;
async function initialMessages() {
  conn = await connection;
  let cursor = await conn.db('Messages').collection('messages').find()
  let msgs = await cursor.toArray();
  //console.log(msgs);
  let fileInfos = [];

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
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
  let data = [];
    msgs.map((m) => {
      fileInfos.map((i) => {
        if (m.uniqueId == i.name) {
          m.url = i.url;
        }
      })
    })
  console.log(msgs);
  return msgs;
}

module.exports = initialMessages();