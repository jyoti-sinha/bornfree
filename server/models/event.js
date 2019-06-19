const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    name: String,
    description: String,
    date: Date
});

module.exports = mongoose.model('event', EventSchema, 'events'); //'model name', Schema name, 'collection name'