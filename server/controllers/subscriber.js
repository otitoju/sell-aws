const Subscriber = require('../models/subscriber')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
const Product = require('../models/product')

exports.subscribePath = async (req, res) => {
    try {
        const { month } = req.body
        if(!month){
            return res.status(403).json({
                message:'Please select a month'
            })
        }
        else{
            const info = await Subscriber.findOne({_id: req.params.id })
            if(!info) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            else {
                if(info.token == true) {
                    return res.status(400).json({
                        message: 'Oops! you still have a valid subscription.'
                    })
                }
                else {
                    info.month = month || info.month
                    var start = new Date();
                    info.start = start
                    var end = new Date()
                    end.setMonth( end.getMonth() + parseInt(month) );
                    info.end = end
                    info.token = true
                    await info.save()
                    return res.status(201).json({
                        message:'Your subscription was successful',
                        info: info
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error:error.message
        })
    }
}

exports.loginSubscriber = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password){
            return res.status(403).json({
                message:'Please fill all fields'
            })
        }
        else{
            const user = await Subscriber.findOne({email: req.body.email})
            if(!user){
                return res.status(404).json({
                    message:'Wrong password/email'
                })
            }
            else{
                var checkDate = new Date()
                if(checkDate > user.end){
                    return res.status(403).json({
                        message:'Your subscription has expired'
                    })
                }
                else{
                    const passwordIsvalid = bcrypt.compareSync(password, user.password)
                    if(!passwordIsvalid){
                        return res.status(404).json({
                            message:'Wrong password/email'
                        })
                    }
                    else{
                        const token = await jwt.sign({id:user.id, name:user.name, email:user.email}, config.userSecretKey)
                        const id = user._id
                        return res.status(200).json({
                            message: 'Login was successful',
                            token: token,
                            id: id
                        })
                    }
                }
            }
            
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error:error.message
        })
    }
}

exports.signUp = async (req, res) => {
    try {
        const { fname, lname, email, phone, password } = req.body
        if(!fname || !lname || !email || !password || !phone){
            return res.status(403).json({
                message:'Please fill all inputs'
            })
        }
        else{
            const hashed = bcrypt.hashSync(password, 10)
            const info = await Subscriber.create(req.body)
            info.password = hashed
            await info.save()
            return res.status(201).json({
                message: 'Registration successful'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR'
        })
    }
}

exports.getUserWithProduct = async (req, res) => {
    try {
        const info = await Subscriber.find().populate('product')
        return res.status(200).json({
            info: info
        })
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR'
        })
    }
}

exports.getSingleSubscriber = async (req, res) => {
    try {
        await Subscriber.findById(req.params.id).populate("product").exec(function (err, info) {
            if (err) {
                console.log(err);
            } else {
                const products = info.product
                return res.status(200).json({
                    info: info,
                    product: products
                })
            }
        });
    } catch (e) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR'
        })
    }
}

exports.subscriberPostNewProduct = async (req, res) => {
    try {
        await Subscriber.findOne({_id: req.params.id }, async (err, info) => {
            if(err){
                console.log(err)
            }
            else{
                const { name, details, address, phone, fb, ig, twitter, category } = req.body
                if(!name || !details || !address || !phone || !category || !fb || !ig || !twitter) {
                    return res.status(403).json({
                        message:'Please ensure all fields all properly filled'
                    })
                }
                else {
                    await Product.create(req.body, async (err, product) => {
                        if(err){
                            console.log(err.message)
                        }
                        else{
                            const products = info.product
                            product.userId = req.params.id
                            await product.save()
                            products.push(product)
                            await info.save()
                            return res.status(201).json({
                                message: `Product added successfully`,
                                info: product
                            })
                        }
                    })
                }
            }
        })
    } catch (e) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR'
        })
    }
}

exports.changePassword = async (req, res) => {
    try {
        const info = await Subscriber.findOne({_id: req.params.id })
        if(!info) {
            return res.status(404).json({
                message: "Not found"
            })
        }
        else {
            const { password } = req.body
            if(!password) {
                return res.status(400).json({
                    message: 'Please enter a password'
                })
            }
            else {
                const hashed = bcrypt.hashSync(password, 10)
                info.password = hashed || info.password
                await info.save()
                return res.status(200).json({
                    message: 'Password successfully changed'
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR'
        })
    }
}
