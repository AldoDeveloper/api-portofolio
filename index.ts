
import * as express from 'express';
import http = require('http');
import { initializeApp } from 'firebase/app';
import { createData, getAllData } from './app/firebase/data';
import * as bodyParser from 'body-parser';
import { v4 as uuidV4 } from 'uuid'
import { Users } from './types/types';
const app    = express();
const server = http.createServer(app);

const firebaseConfigs = { 
    databaseURL: "https://nodejs-app-1594e-default-rtdb.asia-southeast1.firebasedatabase.app",
  };

const appFirebase = initializeApp(firebaseConfigs);
app.get('/test', bodyParser.json(), async(req, res, next) =>{
    const data = await getAllData(appFirebase, '/users');
    return res.json(data);
});

app.post('/create-users', bodyParser.json(), async(req, res, next) =>{
    const users : Users = req.body;
    const createFirebase = await createData(appFirebase, uuidV4() as string, users);
    if(createFirebase){
       return  res.status(201).json({messages: 'success', code: 201})
    }
})

server.listen(3500, () =>{
    console.log('Server Run http://localhost:3500');
})