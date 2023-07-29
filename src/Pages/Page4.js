import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
function Page4({lang}) {

// console.log(obj.train_number)
 const[userDetails,setUserDetails]=useState({
  name:'',
  gender:'',
  age:'',
  // seatType:'',
  pnr_number:"MMW"+Date.now().toString().slice(3)
 })
//  console.log(userDetails)
const [showmsg,setShowMag]=useState(false)
const[count,setCount]=useState(30)
const navigate=useNavigate()

useEffect(()=>{

const{name,gender,age,pnr_number}=userDetails
console.log('useeffect')
handleSpeechSynthesis()

if(name && gender && age  && pnr_number){
  localStorage.setItem("user_details",JSON.stringify(userDetails))

  async function sendToServer() {
    const response = await fetch('http://localhost:4000/user_details',
    {
      method:'POST',
      mode:'cors',
      headers:{'Content-type':'application/json'
    },
    body:JSON.stringify(userDetails)
    });
    const res = await response.json();
    return res;
  }
  sendToServer().then(result=>{ 
    localStorage.setItem('seat_details',JSON.stringify(result))
    console.log(result)  
    navigate('/page5')
  }).catch(()=>{
    console.log('error')
  })
  }
  else{
  console.log("no object")
 }


const interval= setInterval(() => {
  setCount(count=> count-1)
 }, 1000);
 return(()=>{
  clearInterval(interval)
 })
// eslint-disable-next-line
 },[userDetails])

 useEffect(()=>{
if(count===0){
  navigate('/Page3')
  setUserDetails({
  name:'',
  gender:'',
  age:'',
  // seatType:''
  })
  setCount(25)
}
 },[count,navigate])

 const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition


 const handleSpeechRecognition= ()=>{
  setShowMag(false)
  const recognition=  new SpeechRecognition()
  setTimeout (()=> {
    recognition.onstart=()=>{
      setShowMag(true)
    }
    recognition.onresult= (e)=>{
      const transcript= e.results[0][0].transcript
      if (!userDetails.name) {
        setUserDetails({...userDetails,name: transcript });
      }
     else if (!userDetails.gender) {
      if(transcript==="mail"){
        setUserDetails({...userDetails,gender: "male" });
      }else{
         setUserDetails({...userDetails,gender: transcript });
      }
       }
       else if (!userDetails.age) {
        setUserDetails({...userDetails,age: transcript });
      }
      // else if(!userDetails.seatType){
      //   setUserDetails({...userDetails,seatType: transcript });
      // }
      else{
        console.log(userDetails)
      }
    }
    recognition.start()

  },4000)
 }

 const handleSpeechSynthesis = () => {
  const speech = new SpeechSynthesisUtterance()
  speech.lang=lang==='English'?"en-US":"hi-IN"

  if (!userDetails.name) {
    speech.text = 'Please say person name.कृपया व्यक्ति का नाम बताएं';
    handleSpeechRecognition()
    
  } else if (!userDetails.gender) {
    speech.text = 'Please say the gender.कृपया लिंग बताएं';
    handleSpeechRecognition()

  } else if(!userDetails.age) {
    speech.text = 'Please say the age.कृपया उम्र बताएं';
    handleSpeechRecognition()

  } 
  else{
    console.log(userDetails)
  }
speechSynthesis.speak(speech)
};

  return(
    <div>  
  <p className='absolute top-12 left-3 font-bold text-xl'>Time : {count+':00'}</p>
  {/* <div className='absolute right-0 top-20 bg-gray-300 p-5 mb-10 sm:top-12'>
    <span>Types Of Seats And Price Per Seat</span>
    <li>Ac:500</li>
    <li>Non Ac:400</li>
    <li>General:500</li>
  </div> */}
  <div className={showmsg?`absolute top-[25%] right-[50%] mt-20 sm:mt-0 sm:top-[12%] sm:right-[55%]`:`hidden`}>
      <svg id="Layer_1" className='mic w-10' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='absolute text-2xl font-bold '>listening....</p>
      </div>
  <div className='absolute top-[40%] bg-gray-400 p-5 mt-20 rounded-md shadow-md shadow-black w-full sm:top-[30%] sm:left-[30%] sm:mt-0 sm:w-1/2  lg:w-1/3'>
    <form className='flex flex-col mb-12 '>
      <label htmlFor="" className='text-xl font-bold mb-1'>Name : </label>
      <input type="text" name="name" id="" className='focus:outline-none rounded-md p-1 bg-gray-200 border-none shadow-md focus:bg-white transition focus:border-gray-200 mb-3' value={userDetails.name} onChange={(e)=> setUserDetails({...userDetails,name:e.target.value})} />

      <label htmlFor="" className='text-xl font-bold mb-1'>Gender : </label>
      <input type="text" name="gender" id="" className='focus:outline-none rounded-md p-1 bg-gray-200 border-none shadow-md focus:bg-white transition focus:border-gray-200 mb-3'  value={userDetails.gender} onChange={(e)=> setUserDetails({...userDetails,gender:e.target.value})} />

      <label htmlFor="" className='text-xl font-bold mb-1'>Age : </label>
      <input type="number" name="age" id="" className='focus:outline-none rounded-md p-1 bg-gray-200 border-none shadow-md focus:bg-white transition focus:border-gray-200 mb-3'  value={userDetails.age} onChange={(e)=> setUserDetails({...userDetails,age:e.target.value})} />
      <input type="submit" name="" id="" className='hidden' />
{/* 
      <label htmlFor="" className='text-xl font-bold mb-1'>Seat Type : </label>
      <input type="text" name="seatType" id="" className='focus:outline-none rounded-md p-1 bg-gray-200 border-none shadow-md focus:bg-white transition focus:border-gray-200 mb-3'  value={userDetails.seatType} onChange={(e)=> setUserDetails({...userDetails,seatType:e.target.value})} /> */}
      
      {/* <p>Want to book another ticket for same source destination and date ? <button type='button' className='text-black font-bold'>Click Here</button></p> */}
    </form>
  </div>
    </div>
  )
}

export default Page4