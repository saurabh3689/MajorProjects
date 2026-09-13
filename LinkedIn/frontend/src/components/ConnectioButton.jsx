import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import io from "socket.io-client"
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
const socket = io("https://majorprojects-0fps.onrender.com")
function ConnectioButton({userId}) {
let {serverUrl} = useContext(authDataContext)
let {userData, setUserData} = useContext(userDataContext)
let [status, setStatus] = useState("")
let navigatev = useNavigate()
    const handleSendConnection = async ()=>{
        try{
           let result = await axios.post(`${serverUrl}/api/connection/send/${userId}`,
            {},{withCredentials:true})
           console.log(result)
        }catch(error){
           console.log(error.response?.data)
        }
    }

    const handleRemoveConnection = async ()=>{
        try{
           let result = await axios.delete(`${serverUrl}/api/connection/remove/${userId}`,
            {withCredentials:true})
           console.log(result)
        }catch(error){
           console.log(error)
        }
    }

    const handleGetStatus = async ()=>{
        try{
           let result = await axios.get(`${serverUrl}/api/connection/getstatus/${userId}`,
            {withCredentials:true})
           console.log(result)
           setStatus(result.data.status)
        }catch(error){
           console.log(error)
        }
    }

useEffect(()=>{
    socket.emit("register", userData?._id)
    handleGetStatus()

    socket.on("statusUpdate", ({updatedUserId, newStatus})=>{
        if(updatedUserId == userId){
           setStatus(newStatus)
        }
       
    })

    return()=>{
        socket.off("statusUpdate")
    }
},[userId])

const handleClick = async()=>{
    if(status == "disconnect"){
        await handleRemoveConnection()
    }else if(status == "received"){
     navigatev("/network")
    }else{
        await handleSendConnection()
    }
}

return(
    <button className='min-w-[100px] h-[40px] rounded-full border-2 
            border-[#2dc0ff] text-[#2dc0ff] cursor-pointer' onClick={handleClick}
            disabled={status == "pending"}>{status}
            </button>
  )
}

export default ConnectioButton
