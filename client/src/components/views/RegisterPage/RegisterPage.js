import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    //안하면 페이지가 refresh가 됨
    event.preventDefault();

    if(password !== confirmpassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

  let body = {
    email: email,
    password: password,
    name: name
  }

  //리덕스를 사용하기 대문에 axios를 사용하지 않고 아래와 같이 디스패리를 통해
  //액션을 주는 과정
  dispatch(registerUser(body))
  .then(response => {
    //react에서 페이지 이동시에는 아래와 같이 작성
    if(response.payload.success){
      props.history.push("/login")
    }else{
      alert('failed to sign up!');
    }
  })
  }


  return (
    <div style={{display:"flex",justifyContent:"center", alignItems:"center",
    width:'100%', height:'100vh'}}>
      <form style={{display:'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={confirmpassword} onChange={onConfirmPasswordHandler} />

        <br/>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
