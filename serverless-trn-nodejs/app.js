// app.js 
const sls = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
app.use(bodyParser.json({ strict: false }));
// Create User endpoint
app.post('/trn', function (req, res) {
  const { userId, name, gcpid, endtoendID, gcpID, status, remittanceInfo, clientref, amt, createdAt } = req.body;
const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
      endtoendID: endtoendID,
      gcpID: gcpID,
      status: status,
      remittanceInfo: remittanceInfo,
      clientref: clientref,
      amt: amt,
      createdAt: createdAt,
    },
  };
dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not create transaction ${userId}` });
    }
    res.json({ userId, name, gcpid, endtoendID, gcpID, status, remittanceInfo, clientref, amt, createdAt });
  });
})
// Get User endpoint
app.get('/trn/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not get transaction ${userId}` });
    }
    if (result.Item) {
      const {userId, name, gcpid, endtoendID, gcpID, status, remittanceInfo, clientref, amt, createdAt} = result.Item;
      res.json({ userId, gcpid, endtoendID });
    } else {
      res.status(404).json({ error: `Transaction ${userId} not found` });
    }
  });
})
module.exports.server = sls(app)