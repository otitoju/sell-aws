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
//app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}))
app.use('/', routes)
// port
const port =  9000
// app.get('/', (req, res) => {
//     res.send(`<h1>Welcome sellyourmarket server</h1>`)
// })
//if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    
      // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    })
//}
//mongodb://localhost:27017/GraphQLDB
//mongodb://sellyourmarket:sellyourmarket1@ds263928.mlab.com:63928/sellyourmarket
mongoose.connect('mongodb://sellyourmarket:sellyourmarket1@ds263928.mlab.com:63928/sellyourmarket', { useNewUrlParser: true,  useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log('Database connected')
    app.listen(port, () => {
        console.log(`Server started on port:${port}`)
    })
})
