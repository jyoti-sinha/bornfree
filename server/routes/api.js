const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
//Models
const Event = require('../models/event');



  
  
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request.');
    }

    let token = req.headers.authorization; 
    if (!token) {
        return res.status(402).send('Unauthorized request.');
    }

    let payload = jwt.verify(token, 'secretkey');
    if (!payload) {
        return res.status(403).send('Unauthorized request.');
    }

    req.userId = payload.subject;
    next();
};
  
  
  
router.get('/events', verifyToken, (req, res) => {
    Event.find((err, event) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(event);
      }
    })
})
  
router.post('/addevent', verifyToken, (req, res) => {
    let event = new Event(req.body);
    event.save((err, event) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send({ status: 200, event });
      }
    })
})
  
router.put('/updateevent', verifyToken, (req, res) => {
    let eventData = req.body;
    Event.updateOne({_id : eventData._id}, { $set: eventData }, (err, event) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send({ status: 200 });
      }
    })
})
  
router.delete('/deleteevent', verifyToken, (req, res) => {
    let eventData = req.body;
    Event.deleteOne({_id: eventData._id}, (err, event) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send({ status: 200 });
      }
    })
})
  
  
  
  
  
module.exports = router;