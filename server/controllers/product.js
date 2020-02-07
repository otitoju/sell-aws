const Product = require('../models/product')
const Children = require('../models/children')

// post new products
exports.postProducts = async (req, res) => {
    try {
        const { name, details, address, phone, fb, ig, twitter } = req.body
        if(!name || !details || !address || !phone){
            return res.status(403).json({
                message:'Please ensure all fields all properly filled'
            })
        }
        else{
            const info = await Product.create(req.body)
            return res.status(201).json({
                message:'Product created successfully',
                info:info
            })
        }
    } catch (error) {
        return res.status(500).json({message:'INTERNAL SERVER ERROR', error: error.message})
    }
}

//update products
exports.updateProduct = async (req, res) => {
    try {
        const info = Product.findOne({_id: req.params.id})
        if(!info){
            return res.status(404).json({
                message:'Product not found'
            })
        }
        else{
            const { name, details, address, phone, fb, ig, twitter } = req.body
            info.name = name || info.name
            info.details = details || info.details
            info.address = address || info.address
            info.phone = phone || info.phone
            info.fb = fb || info.fb
            info.ig = ig || info.ig
            info.twitter = twitter || info.twitter
            await info.save()
            return res.status(200).json({
                message:'Product successfully updated'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error: error.message
        })
    }
}

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const info = await Product.findOneAndDelete({_id: req.params.id})
        if(!info){
            return res.status(404).json({
                message:'Product not found'
            })
        }
        else{
            return res.status(200).json({
                message:'Product deleted successfully'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error: error.message
        })
    }
}

exports.filterByCategory = async (req, res) => {
    try {
        const { category } = req.body
        const info = await Product.find({category: category })
        if(info.length > 0) {
            return res.status(200).json({
                info: info,
                success: true
            })
        }
        else {
            return res.status(404).json({
                message: 'Not found'
            })
        }
    } catch (e) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error: e.message
        })
    }
}

exports.postProductsByCategory = async (req, res) => {
    try {
        const { name, details, address, phone, fb, ig, twitter, category } = req.body
        if(!name || !details || !address || !phone || !category || !fb || !ig || !twitter) {
            return res.status(403).json({
                message:'Please ensure all fields all properly filled'
            })
        }
        else {
            const info = await Product.create(req.body)
            info.userId = req.params.userId
            await info.save()
            return res.status(201).json({
                message:'Product created successfully',
                info:info
            })
        }
    } catch (error) {
        return res.status(500).json({message:'INTERNAL SERVER ERROR', error: error.message})
    }
}

exports.getAllProducts = async (req, res) => {
    const info = await Product.find()
    res.status(200).json({info: info})
} 

