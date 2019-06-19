const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Event = require('./models/event');
const User = require('./models/user');

//db details
const mongoose = require('mongoose');
const db = 'mongodb://jyoti:jyoti1234@ds233541.mlab.com:33541/practiceonline';
//mongodb://<dbuser>:<dbpassword>@ds233541.mlab.com:33541/practiceonline

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


//connect to db
mongoose.connect(db, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log('Could not connect to db.', err);
  } else {
    console.log('Connected to db online.');
  }
})


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

app.post('/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, registeredUser) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      let token = jwt.sign({ subject: user._id }, 'secretkey');
      return res.status(200).send({ status: 200, token: token });
    }
  })
})

app.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne(userData, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    } else {      
      if (!user) {
        return res.status(200).send({status: 401});
      } else {
        let token = jwt.sign({ subject: user._id }, 'secretkey');
        return res.status(200).send({ status: 200, user, token: token });
      }

    }
  })
})

app.get('/events', verifyToken, (req, res) => {
  Event.find((err, event) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(event);
    }
  })
})

app.post('/addevent', verifyToken, (req, res) => {
  let event = new Event(req.body);
  event.save((err, event) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ status: 200, event });
    }
  })
})

app.put('/updateevent', verifyToken, (req, res) => {
  let eventData = req.body;
  Event.findByIdAndUpdate(eventData._id, { $set: eventData }, (err, event) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ status: 200, event });
    }
  })
})

app.delete('/deleteevent', verifyToken, (req, res) => {
  let eventData = req.body;
  Event.findByIdAndRemove(eventData._id, (err, event) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ status: 200 });
    }
  })
})







app.listen(port, () => {
  console.log('Server api is running.')
})
