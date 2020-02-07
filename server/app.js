require('dotenv').config()
const express = require('express')
const app = express()
const graphHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const path = require('path')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}))
app.use('/', routes)
// port
const port = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send(`<h1>Welcome sellyourmarket server</h1>`)
})
//if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, '../client/build')));
    
    //   // Handle React routing, return all requests to React app
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    // })
//}
//mongodb://localhost:27017/GraphQLDB
//mongodb://sellyourmarket:sellyourmarket1@ds263928.mlab.com:63928/sellyourmarket
mongoose.connect('mongodb://localhost:27017/GraphQLDB', { useNewUrlParser: true,  useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('Database connected')
    app.listen(port, () => {
        console.log(`Server started on port:${port}`)
    })
})
