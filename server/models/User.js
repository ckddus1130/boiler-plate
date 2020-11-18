const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds= 10
const jwt =require('jsonwebtoken')

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
//유저스키마 즉 암호화를 하기전에 하는 작업
userSchema.pre('save',function( next ){
  var user = this;

  if(user.isModified('password')){

      //비밀번호를 암호화 시킨다. 참고  https://www.npmjs.com/package/bcrypt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash
        next()
    });
});
  } else {
    next()

  }

});

userSchema.methods.comparePassword = function(plainPassword, cb) {

  //plainPassword ckddus1!   암호화된 비밀번호 :$2b$10$zfcSFk9Dk5Zq5/KV8sEX4usF5JdnVlMhwKIijWgj1pP7veH82HyY
  //암호화된 비밀번호를 복호화 할 순없어서 plainPassword를 암호화한후 비교를 해야 합니다.
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function(cb) {

  var user = this;
  //jsonwebtoken을 이용해서 토큰을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken')
  // 아래 두개를 합치면 토큰을 생성해줍니다.
  //user._id + 'secretToken' = token
  //-> 
  //secretToken을 가져오면 user._id를 가져온다.
  //'secretToken' -> user._id

  user.token = token
  user.save(function(err,user){
    if(err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken =function(token,cb){
  var user = this;
  
  
  //토큰을 decode한다.

  jwt.verify(token, 'secretToken', function(err, decoded){
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인

    user.findOne({"_id": decoded, "token": token}, function(err,user){
      if(err) return cb(err);
      cb(null,user)
    })
  })
}

//model은 Schema를 감싸줘야 하기 때문에
const User = mongoose.model('User', userSchema)

//다른 곳에서 User를 사용하기 위해서 exports 해줍니다.
module.exports = {User}

