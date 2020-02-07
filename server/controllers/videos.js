const Video = require('../models/videos')
const Subscriber = require('../models/subscriber')

exports.getSingleVideo = async (req, res) => {
    try {
        await Subscriber.findById(req.params.id).populate("video").exec(function (err, info) {
            if (err) {
                console.log(err.message);
            } else {
                const videos = info.video
                return res.status(200).json({
                    video: videos
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

exports.getAllVideos = async (req, res) => {
    try {
        const info = await Video.find().sort({ "_id": -1 })
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

exports.postVideos = async (req, res) => {
    try {
        const { name, details, url } = req.body
        if(!name || details || url) {
            return res.status(403).json({
                message:'Please ensure all fields all properly filled'
            })
        }
        else {
            const info = await Video.create(req.body)
            info.userId = req.params.userId
            await info.save()
            return res.status(201).json({
                message:'Video created successfully',
                info:info
            })  
        }
    } catch (error) {
        return res.status(500).json({message:'INTERNAL SERVER ERROR', error: error.message})
    }
}

exports.updateVideo = async (req, res) => {
    try {
        const info = await Video.findOne({ _id: req.params.id }) 
        if(!info) {
            return res.status(404).json({
                message: 'No post found'
            })
        }
        else {
            info.name = req.body.name || info.name
            info.details = req.body.details || info.details
            info.url = req.body.url || info.url
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

exports.deleteVideo = async (req, res) => {
    try {
        const info = await Video.findOneAndDelete({ _id: req.body.id })
        if(!info) {
            return res.status(404).json({
                message: 'Unable to complete.'
            })
        }
        else {
            return res.status(200).json({
                message: 'Video successfully deleted'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })    
    }
}
