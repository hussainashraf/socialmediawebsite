import React from 'react'
import "../style/Home.css"
export default function Profile() {
  return (
    <div className='home'>
      {/* {card} */}
      <div className="card">
        {/* {card header} */}
        <div className="card-header">
          <div className="card-pic">
            <img src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80" alt="" />
          </div>
          <h5>Rajat</h5>
        </div>
          {/* {card-image} */}
          <div className="card-image">

            <img src="https://images.unsplash.com/photo-1671412766854-59f01b1409a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="" />

          </div>
          {/* {card-content} */}
          <div className="card-content">
           <span className="material-symbols-outlined">favorite</span>
           <p>1 Like</p>
           <p>This is amzing</p>
          </div>
          <div className="add-comment">
          <span className="material-symbols-outlined">mood</span>
          <input type="text" placeholder='Add Comment' />
          <button className="comment">POST</button>
          </div>
      </div>
    </div>
  )
}
