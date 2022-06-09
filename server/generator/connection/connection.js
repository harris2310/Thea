var express = require('express');
const {MongoClient} = require('mongodb');


async function initializing() {
  const mongoURI = process.env.API_KEY;
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  let c = await client.connect();
  return c;
}


module.exports = initializing();


