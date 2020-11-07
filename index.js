const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://cho:ckddus1!@boiler-plate.aantw.mongodb.net/boiler-plate?retryWrites=true&w=majority', {
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false 
}).then( () => console.log('mongoDB connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world!~~ Welcome to Coding world'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))