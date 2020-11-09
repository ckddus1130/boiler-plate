const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type:String,
      maxlength:50
    },
    email: {
      type:String,
      trim:true, // 간격제거
      unique: 1
    },
    password: {
      type:String,
      minlength:5
    },
    lastname: {
      type:String,
      maxlength:50
    },
    //number가 1이면 관리자 2이면 사용자 .. 이런식
    role: {
      type:Number,
      default: 0
    },
    image:String,
    token: {
      type:String,
    },
    //token의 유효기간설정
    tokenExp: {
      type:Number
    }
})

//model은 Schema를 감싸줘야 하기 때문에
const User = mongoose.model('User', userSchema)

//다른 곳에서 User를 사용하기 위해서 exports 해줍니다.
module.exports = {User}

