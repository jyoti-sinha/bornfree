const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//Routes
const api = require('./routes/api');
//Models
const User = require('./models/user');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);
const port = 3000;

//connect to Mongodb using Mongoose library
const db = 'mongodb://jyoti:jyoti1234@ds233541.mlab.com:33541/practiceonline';
mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, (err) => {
    if (err) {
      console.log('Could not connect to db.', err);
    } else {
      console.log('Connected to db online.');
    }
})



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


app.listen(port, () => {
  console.log('Server api is running.')
})
