import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Form = ({lang}) => {
  const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  const [tripData, setTripData] = useState({
    source: '',
    destination: '',
    date: ''
  });
  const [showmsg,setShowMag]=useState(false)
  const [count,setCount]=useState(30)
  const navigate=useNavigate()

useEffect(()=>{
 let btn=document.getElementById('btn')
 btn.click()

 const {source,destination,date}=tripData
 if(source && destination && date){
  async function sendToServer() {
    const response = await fetch('http://localhost:4000/user',
    {
      method:'POST',
      mode:'cors',
      headers:{'Content-type':'application/json'
    },
    body:JSON.stringify(tripData)
    });
    const res = await response.json();
    return res;
  }
  sendToServer().then(result=>{
    localStorage.setItem("train_details",JSON.stringify(result))
    console.log(result) 
    navigate('/page3')
  }).catch(err=> navigate('/page3'))
  
  // console.log('next')
 }else{
  console.log("no object")
 }

const interval= setInterval(() => {
  setCount(count=> count-1)
 }, 1000);
 
 return()=>{
  clearInterval(interval)
 }
// eslint-disable-next-line
  },[tripData])

  useEffect(()=>{
  if(count===0){
    navigate('/')
  }
  },[count,navigate])

  const handleSpeechRecognition = (event) => {
    setShowMag(false)
    const recognition = new SpeechRecognition();
    setTimeout(()=>{
      recognition.onstart=()=>{
        setShowMag(true)
      }
      recognition.onresult=(e)=>{
        const transcript= e.results[0][0].transcript
      // console.log(transcript)
      if (!tripData.source) {
        setTripData({ ...tripData, source: transcript });
      }
     else if (!tripData.destination) {
         setTripData({ ...tripData, destination: transcript });
       }
       else if (!tripData.date) {
        setTripData({ ...tripData, date: transcript });
      }
      } 
        recognition.start()
    },5000)
    
  
  };
  const handleSpeechSynthesis = () => {
    const speech = new SpeechSynthesisUtterance()
   speech.lang=lang==='English'?"en-US":"hi-IN"
    if (!tripData.source) {
      speech.text =`Please say the source.कृपया स्रोत बताएं.`;
      handleSpeechRecognition()
      // console.log("hello")
    } else if (!tripData.destination) {
      speech.text ='Please say the destination.कृपया गंतव्य बताएं.';
      handleSpeechRecognition()

    } else if(!tripData.date) {
      speech.text ='Please say the date.कृपया तारीख बताएं.';
      handleSpeechRecognition()

    }else{
      console.log(tripData)
    }
    speechSynthesis.speak(speech);

  };


  return (

    <>
    <p className='fixed top-14 font-bold text-2xl'>Time : {count+': 00'}</p>
      <div className={showmsg?`fixed top-[10%] right-[50%]`:`hidden`}>
      <svg id="Layer_1" className='mic w-20' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='fixed right-[48%] text-2xl font-bold '>listening....</p>
      </div>
      <button id='btn' onClick={handleSpeechSynthesis}>click</button>
      {/* <h2>Speech Recognition Example</h2> */}
      <div className='flex flex-col h-screen justify-center items-center bg-gray-300'>
      <div className='bg-gray-600 p-5 text-3xl font-bold shadow-md shadow-black rounded w-[40%] fixed'>
      <p className='pb-4 mx-5 border-b'>Source : {tripData.source}</p>
      <p className='pb-4 mx-5 mt-3 border-b'>Destination  : {tripData.destination}</p>
      <p className='pb-4 mx-5 mt-3 border-b'>Date : {tripData.date}</p>
      </div>
      </div>
    </>
  )
}


export default Form;