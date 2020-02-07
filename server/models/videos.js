const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    name: String,
    details: String,
    url: String,
    userId: String
})

module.exports = mongoose.model('videos', videoSchema)