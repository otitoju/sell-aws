const mongoose = require('mongoose')
const time = Date.now() + 60
const subscriberSchema = new mongoose.Schema({
    start: { type:Date },
    end: { type: Date },
    fname: String,
    lname: String,
    token: { type: Boolean, default: false },
    email: String,
    password: String,
    month:{ type: Number },
    phone: { type: Number },
    address: { type: String },
    product: [{
        type:mongoose.Schema.Types.ObjectId, ref:'products'
    }],
    event: [{
        type:mongoose.Schema.Types.ObjectId, ref:'events'
    }],
    videos: [{
        type:mongoose.Schema.Types.ObjectId, ref:'videos'
    }]
})

module.exports = mongoose.model('subscribers', subscriberSchema)
