const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const apiRoute = require('./Route/routes')

const port = 8080
app.use(express.json() , cors())

app.use('/app/user', apiRoute)


dotenv.config()

mongoose.connect( process.env.DB_CONNECT, {useNewUrlParser:true})
.then(() => {console.log('Database is connected')})
.catch( err=> console.log(err))

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})