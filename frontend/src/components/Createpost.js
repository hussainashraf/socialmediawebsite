import React, { useState,useEffect } from "react";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom"

import "../style/Createpost.css";
export default function Createpost() {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("")
  const notifyA = (msg) =>toast.error(msg)
  const notifyB = (mssg) =>toast.success(mssg)
 
  useEffect(() => {

    // saving post to mongodb
    if (url) {

      fetch("http://localhost:5050/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])

  //upload image to cloudnary
  const postData = ()=>{
    console.log(body,image)
    const data = new FormData();
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","centoscloud")
    fetch("https://api.cloudinary.com/v1_1/centoscloud/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))

      
  }
  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post </h4>
        <button id="post-btn" onClick={()=>{postData( )}}>Share</button>
      </div>
      <div className="main-div">
        <img
          id="output"
          src="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0])
          }}
        />
      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm91bmRlZCUyMGdpcmwlMjBmYWNlfGVufDB8fDB8fA%3D%3D"
              alt=""
            />
          </div>
          <h5>Ramesh</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write Caption"
        ></textarea>
      </div>
    </div>
  );
}
