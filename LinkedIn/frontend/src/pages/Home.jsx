import React, {useContext, useState, useRef, useEffect} from 'react'
import Nav from '../components/Nav.jsx'
import dp from "../assets/dp.jpg"
import { FiPlus } from "react-icons/fi"
import {FiCamera} from "react-icons/fi"
import {HiPencil} from "react-icons/hi2"
import { userDataContext } from '../context/userContext.jsx'
import EditProfile from '../components/EditProfile.jsx'
import {RxCross1 } from "react-icons/rx"
import {BsImage} from "react-icons/bs"
import { authDataContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import Post from '../components/Post.jsx'

function Home() {
  let {userData, setUserData, edit, setEdit, postData,
     setPostData, handleGetProfile, getPost} = useContext(userDataContext)
  let{serverUrl} = useContext(authDataContext)
  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  let [description, setDescription] = useState("")
  let [uploadPost, setUploadPost] = useState(false)
  let [posting, setPosting] = useState(false)
  let image = useRef()
  let [suggestedUser, setSuggestedUser] = useState([])

  function handleImage(e){
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

 async function handleUploadPost(e){
  setPosting(true)
    try{
      let formData = new FormData()
      formData.append("description", description)
      if(backendImage){
        formData.append("image", backendImage)
      }
      let result =await axios.post(serverUrl + "/api/post/create",
        formData, {withCredentials: true})
        console.log(result)
        setPosting(false)

    }catch(error){
      setPosting(false)
      console.log(error)
    }
  }

  const handleSuggestedUsers=async ()=>{
    try {
        let result=await axios.get(serverUrl+"/api/user/suggestedusers",{withCredentials:true})
        setSuggestedUser(result.data)
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
    handleSuggestedUsers()
},[])

useEffect(()=>{
    getPost()
},[uploadPost])




  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] pt-[100px]
    flex items-center lg:items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row
    relative pb-[50px]'>
      {edit && <EditProfile/>}
      
      <Nav />

      <div className='w-full lg:w-[25%] min-h-[250px] bg-[white] shadow-lg
      rounded-lg px-[10px] relative'>
        <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden
        flex items-center justify-center relative cursor-pointer'
         onClick={()=>setEdit(true)}>
          <img src={userData.coverImage || null} alt="" className='w-full' />
          <FiCamera className='absolute right-[20px] top-[20px] w-[25px]
          h-[25px] text-white curser-pointer'/>
        </div>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex
        items-center justify-center absolute top-[65px] left-[35px]
        curser-pointer' onClick={()=>setEdit(true)}>
            <img src={userData.profileImage || dp} alt="" className='h-full'/>
            
        </div>
        <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px]
        left-[90px] rounded-full flex justify-center items-center'>
              <FiPlus className='text-white'/>
        </div>

        <div className='mt-[30px] pl-[20px]  font-semibold
        text-gray-700'>
          <div className='text-[22px]'>{`${userData.firstName} ${userData.lastName}`}
          </div>
          <div className='text-[18px] font-semibold text-gray-700'
          >{userData.headline ||""}
          </div>
          <div className='text-[16px] text-gray-500'
          >{userData.location}
          </div>
        </div>
        <button className='w-[100%] h-[40px] my-[20px] rounded-full border-2 
         border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center
         gap-[10px] ' onClick={()=>setEdit(true)}>Edit Profile <HiPencil/>
         </button>
      </div>
      {uploadPost &&
      <div className='w-full h-full bg-black fixed top-0 z-[100]
      left-0 opacity-[0.6]'>
      </div>}
      {uploadPost &&
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white
      shadow-lg top-[100px] rounded-lg fixed z-[200] p-[20px] flex items-start
      justify-start flex-col gap-[20px]'>
        <div className='absolute top-[20px] right-[20px] cursor-pointer'
        ><RxCross1 className='w-[25px] h-[25px] text-gray-800 font-bold 
        cursor-pointer' onClick={()=>setUploadPost(false)}/>
        </div>
        <div className='flex justify-start items-center gap-[10px]'>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex
        items-center justify-center  top-[65px] left-[35px]
        curser-pointer' >
            <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div> 
       <div className='text-[22px]'>{`${userData.firstName} ${userData.lastName}`}
          </div>
        </div>
        <textarea className={`w-full ${frontendImage? "h-[200px]" : "h-[550px]"} outline-none border-none p-[10px]
        resize-none  text-[19px]`} placeholder='what do you want to talk about..?'
        value={description}
        onChange={(e)=>setDescription(e.target.value)}></textarea>

        <div className='w-full h-[300px] overflow-hidden justify-center items-center flex rounded-lg'>
            <img src={frontendImage || null} alt="" className='h-full rounded-lg'/>
          </div>

        <div className= 'w-full h-[200px] flex flex-col'>
          <div className= 'p-[20px] flex items-center justify-start border-b-2 border-gray-500'>
            <BsImage className='w-[24px] h-[24px] text-gray-600' 
            onClick={()=>image.current.click()}/>
          </div>
          <input type="file" ref={image} hidden onChange={handleImage}/>
          

          <div className='felx justify-end items-center '>
          <button className='w-[100%] h-[50px] rounded-full bg-[#24b2ff]
         text-white mt-[40px]'disabled={posting} onClick={handleUploadPost}>
            {posting ? "Posting..." : "Post"}
          </button>
          </div>

        </div>

      </div>}

      <div className='w-full lg:w-[50%] min-h-[200px] bg-[#f0efe7] 
      flex flex-col gap-[20px]'>
        <div className='w-full h-[120px] bg-white shadow-lg rounded-lg 
         flex items-center justify-center gap-[10px] p-[20px]'>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex
        items-center justify-center curser-pointer' >
        <img src={userData.profileImage || dp} alt="" className='h-full'/>
        </div>
        <button className='w-[80%] h-[60px] border-2 rounded-full border-gray-500
        flex items-center justify-start px[20px] hover:bg-gray-200'
        onClick={()=>setUploadPost(true)}>
          Start a post</button>
        </div>
        {postData.map((post, index)=>(
          <Post key={index} id={post._id} author={post.author} description={post.description}
           image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt}/>
        ))}
        

      </div>

      <div className='w-full lg:w-[25%] min-h-[200px] bg-[white] shadow-lg
      hidden lg:flex flex-col p-[20px] '>
        <h1 className='text-[20px] text-gray-600 font-semibold'>
          Suggested Useres</h1>
        {suggestedUser && suggestedUser.length > 0 && (
  <div className='flex flex-col gap-[10px]'>
    {suggestedUser.map((su) => (
      <div key={su.id || su.firstName} className='flex items-center gap-[10px] mt-[10px]
      cursor-pointer hover:bg-gray-200 rounded-lg p-[5px] '
      onClick={()=>handleGetProfile(su.userName)}>
        <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
          <img src={su.profileImage || dp} alt=""
            className='w-full h-full ' />
        </div>
        <div>
          <div className='text-[19px] font-semibold text-gray-700'>
            {`${su.firstName} ${su.lastName}`}
          </div>
          <div className='text-[12px] font-semibold text-gray-500'>
            {su.headline}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
    {suggestedUser.length == 0 &&
    <div>
      <h1>No Suggested Useres</h1>
    </div>}

      </div>
      
    
    </div>
  )
}

export default Home