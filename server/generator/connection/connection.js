var express = require('express');
const {MongoClient} = require('mongodb');



async function initializing() {
  const mongoURI = 'mongodb+srv://Harris1:jakharparkour2310@cluster0.qbpz0.mongodb.net/Messages?retryWrites=true&w=majority';
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let c = await client.connect();
  return c;
}


module.exports = initializing();

