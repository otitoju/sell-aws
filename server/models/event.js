const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: String,
    address: String,
    photo: String,
    date: String,
    userId: String
})

module.exports = mongoose.model('events', eventSchema)
