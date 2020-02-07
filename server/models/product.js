const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    details: String,
    address: String,
    phone: Number,
    fb: String,
    ig: String,
    twitter: String,
    photo: String,
    category: String,
    userId: String
})

module.exports = mongoose.model('products', productSchema)
