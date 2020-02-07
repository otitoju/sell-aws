const mongoose = require('mongoose')

const womenSchema = new mongoose.Schema({
    name: String,
    details: String,
    address: String,
    phone: Number,
    fb: String,
    ig: String,
    twitter: String,
    photo: String,
    category: String
})

module.exports = mongoose.model('women', womenSchema)
