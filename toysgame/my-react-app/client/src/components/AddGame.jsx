import React from "react";
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function AddGame({handleAdd}) {
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [price,setPrice]=useState()
  const [quantity,setQuantity]=useState()
  const [imageUrl,setImage]=useState('')
  const [category,setCategory]=useState('')
   
  // console.log("nameGame",nameGame)
  // console.log("description",description)
  // console.log("price",price)
  // console.log("quantity",quantity)
  // console.log("image",image)
  // console.log("category",category)


  

  return (
  <div>
  
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Description</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Description" onChange={(e)=>setDescription(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Price</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Price" onChange={(e)=>setPrice(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Quantity</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Quantity" onChange={(e)=>setQuantity(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Image</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Image" onChange={(e)=>setImage(e.target.value)}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Category</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category" onChange={(e)=>setCategory(e.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={()=>handleAdd({name,description,imageUrl,price,quantity})}>Add The Game</button>
   

     </div>




  )

}

export default AddGame;