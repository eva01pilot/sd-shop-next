'use client'
import axios from 'axios'
import React from 'react'
import '../../styles/globals.css'
const Page =  (props:any) => { 
  const fetchData = async() =>{
    axios.defaults.withCredentials = true
    await axios.get('http://localhost:3000/api/tshirt/image')
  }
  const createImage = async() =>{
    await axios.post('/api/tshirt/image',{
      image_complete64:'/home/ilya/sd-shop-next/public/white_tshirt.png',
      color: '#ffffff',
      prompt: 'Hatsune Miku',
      image_print64: '/home/ilya/sd-shop-next/public/mikuglitch.png',

    })
  }

  return (
    <>
      <button onClick={fetchData}>fetch</button>
      <button onClick={createImage}>CreateImage</button>
    </>
  )
}


export default Page