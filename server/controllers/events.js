const Event = require('../models/event')
const Subscriber = require('../models/subscriber')

exports.getSingleEvent = async (req, res) => {
    try {
        await Subscriber.findById(req.params.id).populate("event").exec(function (err, info) {
            if (err) {
                console.log(err.message);
            } else {
                const events = info.event
                return res.status(200).json({
                    event: events
                })
            }
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: e.message
        })
    }
}

exports.getAllEvents = async (req, res) => {
    try {
        const info = await Event.find().sort({ "_id": -1 })
        if(info.length > 0) {
            return res.status(200).json({
                info: info
            })
        }
        else {
            return null
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: e.message
        })
    }
}

exports.postEvents = async (req, res) => {
    try {
        const { name, address, date } = req.body
        if(!name || address || date) {
            return res.status(403).json({
                message:'Please ensure all fields all properly filled'
            })
        }
        else {
            const info = await Event.create(req.body)
            info.userId = req.params.userId
            await info.save()
            return res.status(201).json({
                message:'Event created successfully',
                info:info
            })
        }
    } catch (error) {
        return res.status(500).json({message:'INTERNAL SERVER ERROR', error: error.message})
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const info = await Event.findOne({ _id: req.params.id }) 
        if(!info) {
            return res.status(404).json({
                message: 'No post found'
            })
        }
        else {
            info.name = req.body.name || info.name
            info.date = req.body.date || info.date
            info.address = req.body.address || info.address
            await info.save()
            return res.status(200).json({
                message: 'Event updated'
            })
        } 
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const info = await Event.findOneAndDelete({ _id: req.body.id })
        if(!info) {
            return res.status(404).json({
                message: 'Unable to complete.'
            })
        }
        else {
            return res.status(200).json({
                message: 'Event successfully deleted'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })    
    }
}
