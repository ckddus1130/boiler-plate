import Axios from 'axios';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

//페이지 이동시 ()안에 props를 넣어줘야 함 
function LoginPage(props) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  
  const [password, setPassword] = useState("")
  

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    //안하면 페이지가 refresh가 됨
    event.preventDefault();


  let body = {
    email: email,
    password: password
  }

  dispatch(loginUser(body))
  .then(response => {
    //react에서 페이지 이동시에는 아래와 같이 작성
    if(response.payload.loginSuccess) {
      props.history.push('/')
    } else{
      alert('error');
    }
  })
  }
  
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center',
    width:'100%', height:'100vh'}}>
      
      <form onSubmit={onSubmitHandler} style={{display:'flex', flexDirection:'column'}}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler}></input>
        <br/>

        <button type="submit">Login</button>
      </form>

    </div>
  )
}

export default withRouter(LoginPage)

