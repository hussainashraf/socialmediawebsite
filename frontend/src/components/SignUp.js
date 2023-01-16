import React,{useState} from 'react'
import {toast} from 'react-toastify';
import logo from '../img/logo.png'
import "../style/SignUp.css"
import {Link,useNavigate} from "react-router-dom" 
export default function SignUp() {
const navigate = useNavigate();
const[name,setName] = useState("");
const[email,setEmail] = useState("");
const[userName,setUserName] = useState("");
const[password,setPassword] = useState("");
const notifyA = (msg) =>toast.error(msg)
const notifyB = (mssg) =>toast.success(mssg)
const postData = () =>{
  //Sending data to server
  fetch("http://localhost:5050/signup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name:name,
      userName:userName,
      email:email,
      password:password
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
      notifyA(data.error);
    }else{
      notifyB(data.message);  
      navigate("/signin");
      console.log(data)
    }})
}
  return (

           <div className="signup">
             <div className="form-container">
               <div className="form">
               <img className="signuplogo"src={logo} alt="" />
               <p className='loginPara'>Sign up to see photos and videos <br/>from your friend</p>
               <div>
                 <input type="text" name='email' value={email} id='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
               </div>
               <div>
                 <input type="text" name='name' value={name} id='name' placeholder='Full Name' onChange={(e)=>{setName(e.target.value)}}/>
               </div>
               <div>
                 <input type="text" name='username' value={userName} id='username' placeholder='Username' onChange={(e)=>{setUserName(e.target.value)}}/>
               </div>
               <div>
                 <input type="password" value={password} name='password' id='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
               </div>
               <p className='loginPara' style={{fontSize:"12px",margin:"3px 0px"}}>By signing up,your agree to out Terms,<br/>privacy policy and cookies Policy.</p>
               <input type="submit" id="submit-btn" onClick={()=>{postData()}} value="Sign Up"/>
               </div>
               <Link to="/signin"><div className='form2'>
                  Already have an account?<span style={{color:"blue",cursor:"pointer"}}>Sign In</span>
                </div></Link>
                
             </div>
           </div>
  )
}
