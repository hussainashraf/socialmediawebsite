import React,{useState} from 'react'
import "../style/SignIn.css"
import logo from '../img/logo.png'
import {toast} from 'react-toastify';
import {Link,useNavigate} from "react-router-dom"
export default function SignIn() {
const navigate = useNavigate();
const[email,setEmail] = useState("");
const[password,setPassword] = useState("");
const notifyA = (msg) =>toast.error(msg)
const notifyB = (mssg) =>toast.success(mssg)
const postData = () =>{
  //Sending data to server
  fetch("http://localhost:5050/signin",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email:email,
      password:password
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
      notifyA(data.error);
    }else{
      notifyB(data.message);
      console.log(data)
      localStorage.setItem("jwt",data)
    navigate("/")
    console.log(data)
    }
    })
}
  return (
    <div className='signin'>
      <div>
        <div className='loginForm'>
        <img className="signuplogo"src={logo} alt=""/>
        <div><input type="text" name='email' value={email} id='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/></div>
        <div><input type="password" value={password} name='password' id='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        <input type="submit" id="submit-btn" onClick={()=>{postData()}} value="Sign In"/></div>
        </div>
        <div>
        <Link to="/signup"><div className='form2'>
                  Don't have and account?<span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
        </div></Link>
      </div>
      </div>
    </div>
  )
}
