const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const {User} = require("./models/User")

const config= require('./config/key')

//bodyparser가 client 정보를 server가 분석해서 가져올 수 있게 하는 작업
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//appliaction/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false 
}).then( () => console.log('mongoDB connected..'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello world!~~ 곧 새해가 옵니다~!'))

app.post('/register', (req,res)=>{
  
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //데이터베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo)=> {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))