//npm i express
//import express from 'express'
const express = require('express'); //comonJS modules

const Hubs = require('./data/hubs-model'); // import our 'Hubs' database library

const server = express();
const port = 8000;

//add middleware: teaches express new things
server.use(express.json()); //needed to parse JSON

//routes or endpoints
//GET to '/'
server.get('/', (req, res) => {
  res.send({ hello: 'web 25!' });
});

//see a list of Hubs
server.get('/api/hubs', (req, res) => {
  //read the data from the database (Hubs)
  Hubs.find() //return a promise
    .then(Hubs => {
      console.log('Success, Hubs data returned', Hubs);
      res.json(Hubs);
      res.status(200);
    })
    .catch(error => {
      console.log('No Hubs data returned', error);
      //handle the error
      res.status(500).json({ errorMessage: 'sorry, no data returned from the Hubs database' });
    });
});

//create a Hub
server.post('/api/hubs', (req, res) => {
  const hubData = req.body; //for this to work, you need --> server.use(express.json()); from above

  //never trust the client, validate the data. For now, we trust the data for the demo
  Hubs.add(hubData)
    .then(hub => {
      res.status(201);
      res.json(hub);
    })
    .catch(error => {
      console.log('No Hubs data created', error);
      //handle the error
      res.status(500).json({ errorMessage: 'sorry, no data returned from creating the Hubs database' });
    });
});

//delete a Hub
server.delete('/api/hubs/:id', (req, res) => {
  const id = req.params.id;

  Hubs.remove(id)
    .then(deleted => {
      res.status(200);
      res.json(deleted);
    })
    .catch(error => {
      console.log('No Hubs data deleted', error);
      //handle the error
      res.status(500).json({ errorMessage: 'sorry, no data deleted from the Hubs database' });
    });
});

// update a Hub

server.listen(port, () => {
  console.log(`api running on port: ${port}`);
});

//add the index file with code from root folder
// to run the server, type: 'npm run server'
//make a GET request to localhost:8000 using Postman
// to solve the sqlite3 error, just install it --> npm i sqlite3
