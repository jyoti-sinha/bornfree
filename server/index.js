const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const Event = require('./models/event');

//db details
const mongoose = require('mongoose');
const db = 'mongodb://jyoti:jyoti1234@ds233541.mlab.com:33541/practiceonline';
//mongodb://<dbuser>:<dbpassword>@ds233541.mlab.com:33541/practiceonline

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors())


//connect to db
mongoose.connect(db, {
    useNewUrlParser: true
}, (err) => {
    if(err){
        console.log('Could not connect to db.', err);
    }else{
        console.log('Connected to db online.');
    }
})

// app.get("*", (req, res) => {
//     res.sendFile(__dirname + '/app.html');
// })

app.get('/events', (req, res) => {
    // let specialEvents = [
    //     {
    //       "_id": "1",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //       "_id": "2",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //       "_id": "3",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //       "_id": "4",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //       "_id": "5",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     },
    //     {
    //       "_id": "6",
    //       "name": "Auto Expo Special",
    //       "description": "lorem ipsum",
    //       "date": "2012-04-23T18:25:43.511Z"
    //     }
    //   ];
    // res.json(specialEvents);

    Event.find((err, event) => {
        if(err){
            return res.status(500).send(err);    
        }else{
            return res.status(200).send(event);
        }        
    })
})





app.listen(port, () => {
    console.log('Server api is running.')
})
