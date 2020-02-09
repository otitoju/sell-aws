const express = require('express')
const router = express.Router()
const productcontroller = require('../controllers/product')
const subscriber = require('../controllers/subscriber')
const videocontroller = require('../controllers/videos')
const eventcontroller = require('../controllers/events')

// product routes
router.post('/product/:userId', productcontroller.postProducts)
router.put('/product/:id', productcontroller.updateProduct)
router.delete('/del/product/:id', productcontroller.deleteProduct)
router.post('/api/product/category', productcontroller.filterByCategory)
router.get('/api/products', productcontroller.getAllProducts)
router.post('/api/category', productcontroller.postProductsByCategory)

// subscriber routes
router.post('/signup', subscriber.signUp)
router.put('/subscribe/:id', subscriber.subscribePath)
router.post('/login', subscriber.loginSubscriber)
router.post('/api/subscriber/product/:id', subscriber.subscriberPostNewProduct)
router.get('/api/subscriber/:id', subscriber.getSingleSubscriber)
router.get('/api/subscribers', subscriber.getUserWithProduct)
router.put('/api/subscriber/changepassword/:id', subscriber.changePassword)

//videos routes
router.post('/api/video/:id', videocontroller.postVideos)
router.get('/api/videos', videocontroller.getAllVideos)
router.get('/api/videos/:id', videocontroller.getSingleVideo)
router.put('/api/video/update/:id', videocontroller.updateVideo)
router.delete('/api/video/delete/:id', videocontroller.deleteVideo)

//event routes
router.post('/api/event/:id', eventcontroller.postEvents)
router.get('/api/events', eventcontroller.getAllEvents)
router.get('/api/events/:id', eventcontroller.getSingleEvent)
router.put('/api/event/update/:id', eventcontroller.updateEvent)
router.delete('/api/event/delete/:id', eventcontroller.deleteEvent)

module.exports = router;
