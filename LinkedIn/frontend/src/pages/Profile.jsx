import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.jpg"
import axios from "axios";
import { FiPlus } from "react-icons/fi"
import {FiCamera} from "react-icons/fi"
import {HiPencil} from "react-icons/hi2"
import { userDataContext } from '../context/userContext.jsx'
import { authDataContext } from '../context/AuthContext'
import EditProfile from '../components/EditProfile.jsx'
import ConnectioButton from '../components/ConnectioButton.jsx';
import Post from '../components/Post.jsx';

function Profile() {
   let {userData, setUserData, edit, setEdit, postData, setPostData, profileData, setProfileData} = useContext(userDataContext)
   let [profilePost, setProfilePost] = useState([])
   let {serverUrl} = useContext(authDataContext) 
   let [userConnection, setUserConnection] = useState([])
   useEffect(()=>{
    if(profileData && postData){
    setProfilePost(postData.filter((post)=>post.author._id == profileData._id))}
   },[profileData, postData])


  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center
    pt-[100px] pb-[40px]'>
      <Nav/>
      {edit &&
      <EditProfile/>}
      <div className='w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px]'>

        <div className='relative bg-[white] pb-[40px] rounded shadow-lg'>
          <div className='w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden
                  flex items-center justify-center relative cursor-pointer'
                   onClick={()=>setEdit(true)}>
                    <img src={profileData.coverImage || null} alt="" className='w-full' />
                    <FiCamera className='absolute right-[20px] top-[20px] w-[25px]
                    h-[25px] text-white curser-pointer'/>
                  </div>
                  <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex
                  items-center justify-center absolute top-[65px] left-[35px]
                  curser-pointer' onClick={()=>setEdit(true)}>
                      <img src={profileData.profileImage || dp} alt="" className='h-full'/>
                      
                  </div>
                  <div className='w-[20px] h-[20px] bg-[#17c1ff] absolute top-[105px]
                  left-[90px] rounded-full flex justify-center items-center'>
                        <FiPlus className='text-white'/>
                  </div>
          
                  <div className='mt-[30px] pl-[20px]  font-semibold
                  text-gray-700'>
                    <div className='text-[22px]'>{`${profileData.firstName} ${profileData.lastName}`}
                    </div>
                    <div className='text-[18px] font-semibold text-gray-700'
                    >{userData.headline ||""}
                    </div>
                    <div className='text-[16px] text-gray-500'>{profileData.location}
                    </div>
                     <div className='text-[16px] text-gray-500'>{`${profileData.connection?.length || 0} connection`}
                    </div>
                  </div>
                  {profileData?._id && profileData._id == userData._id &&
                  <button className='min-w-[150px] h-[40px] my-[20-px] rounded-full border-2 ml-[20px]
                   border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center
                   gap-[10px] ' onClick={()=>setEdit(true)}>Edit Profile <HiPencil/>
                   </button>}
                    {profileData?._id && profileData._id != userData._id && 
                    <div className='ml-[20px] mt-[20px]'>
                      <ConnectioButton userId={profileData._id}/>
                    </div>}


        </div>
    
    <div className='w-full min-h-[100px] flex items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-1'>
    {`Post (${profilePost.length})`}
   </div>

{profilePost.map((post, index) => (
    <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image}
        like={post.like} comment={post.comment} createdAt={post.createdAt}
    />
))}

{profileData.skills?.length > 0 && 
  <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px]
   font-semibold bg-white shadow-lg rounded-lg">
    <div className="text-[22px] text-gray-600">Skills
    </div>
    <div className="flex flex-wrap justify-start items-center gap-[20px] text-gray-600 p-[20px]">
      {profileData.skills.map((skill, index) => (
        <div key={index} className='text-[20px]'>{skill}</div>
      ))}
       {profileData._id == userData._id &&
      <button className="min-w-[150px] h-[40px] rounded-full border-2 ml-[20px] border-[#2dc0ff]
       text-[#2dc0ff] flex items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>
        Add Skills</button>}
    </div>
  </div>
}
{profileData.education?.length > 0 && 
  <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px]
   font-semibold bg-white shadow-lg rounded-lg">
    <div className="text-[22px] text-gray-600">Education
    </div>
    <div className="flex flex-col justify-start items-start gap-[20px] text-gray-600 p-[20px]">
      {profileData.education.map((edu, index) => (
        <React.Fragment key={index}>
        <div className='text-[20px]'>Collage : {edu.collage}</div>
        <div className='text-[20px]'>Degree : {edu.degree}</div>
        <div className='text-[20px]'>Field Of Study : {edu.fieldOfStudy}</div>
        </React.Fragment>
      ))}
       {profileData._id == userData._id &&
      <button className="min-w-[150px] h-[40px] rounded-full border-2  border-[#2dc0ff]
       text-[#2dc0ff] flex items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>
        Add Education</button>}
    </div>
  </div>
}
{profileData.experience?.length > 0 && 
  <div className="w-full min-h-[100px] flex flex-col gap-[10px] justify-center p-[20px]
   font-semibold bg-white shadow-lg rounded-lg">
    <div className="text-[22px] text-gray-600">Experience
    </div>
    <div className="flex flex-col justify-start items-start gap-[20px] text-gray-600 p-[20px]">
      {profileData.experience.map((ex, index) => (
        <React.Fragment key={index}>
        <div className='text-[20px]'>title : {ex.title}</div>
        <div className='text-[20px]'>Company : {ex.company}</div>
        <div className='text-[20px]'>description : {ex.description}</div>
        </React.Fragment>
      ))}
       {profileData._id == userData._id &&
      <button className="min-w-[150px] h-[40px] rounded-full border-2  border-[#2dc0ff]
       text-[#2dc0ff] flex items-center justify-center gap-[10px]" onClick={()=>setEdit(true)}>
        Add Experience</button>}
    </div>
  </div>
}
        </div>

    </div>
  )
}

export default Profile