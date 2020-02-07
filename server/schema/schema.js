const graphql = require('graphql')
const Product = require('../models/product')
const Subscriber = require('../models/subscriber')
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql

// Product Type
const ProductType = new GraphQLObjectType({
    name:'Product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        details: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLInt },
        fb: { type: GraphQLString },
        ig: { type: GraphQLString },
        twitter: { type: GraphQLString},
        photo: { type: GraphQLString },
        category: { type: GraphQLString }
    })
})

const SubscriberType = new GraphQLObjectType({
    name:'Subscriber',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        start: { type: GraphQLString },
        end: { type: GraphQLString },
        month: { type: GraphQLInt },
        phone: { type: GraphQLInt },
        password: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        // find a single product
        product: {
            type: ProductType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args){
                return Product.findById(args.id)
            }
        },
        // find all products
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({})
            }
        },

        productsbycategory: {
            type: new GraphQLList(ProductType),
            args: {category: {type: GraphQLString }},
            resolve(parent, args) {
                return Product.find({category: args.category})
            }
        },
        // find a single subcriber
        subscriber:{
            type: SubscriberType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return Subscriber.findById(args.id)
            }
        },
        // find all subscribers
        subscribers:{
            type: new GraphQLList(SubscriberType),
            resolve(parent, args){
                return Subscriber.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
