import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom'


function Voice({text, naivgateToOther,navigateToHome}) {
  
const [count,setCount]=useState(8)
const [userText,setUserText]=useState('')
const navigate=useNavigate()
const msg=new SpeechSynthesisUtterance()
// console.log(msg)

const [showmsg,setShowMag]=useState(false)
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

const tellToUser=()=>{
  msg.text=`please Tell Your ${text}`
  speechSynthesis.speak(msg)
}


const userInput=()=>{
  let recognition=new SpeechRecognition()
  setTimeout(()=>{
    recognition.onstart=()=>{
      setShowMag(true)
    }
    recognition.onresult=(e)=>{
    const transcript=e.results[0][0].transcript
    setUserText(transcript)

    }  
  
    recognition.onerror=(e)=>{
      console.error(e.error)
    }
    recognition.start()
  },3000)
  

}


const handleSubmit=(e)=>{
  e.preventDefault()

  fetch('http://localhost:4000/data',{

    method:'POST',
    mode:'cors',
    headers:{'Content-type':'application/json'
  },
  body:JSON.stringify({[text]:userText})
  
  }).then((res)=> res.json())
  .then((data)=>{
    console.log(data)

  })
  console.log('submmited')
}

useEffect(()=>{
  tellToUser()
  userInput()
 setTimeout(()=>{
  let submitBtn=document.getElementById('submitBtn')
  let source=document.getElementById('source')

  if(source.value!==''){
   
    submitBtn.click()
    navigate(`${naivgateToOther}`)
  }else{
    
    navigate(`${navigateToHome}`)
  }
 },8000)
  const interval=setInterval(() => {
  setCount(count=> count-1) 
  },1000);
  // return()=> clearInterval(interval)
  
  // eslint-disable-next-line
},[])


  return (
    <div className=''>
      
      <div className='fixed top-20 w-full'>
      <h1 className='text-xl font-bold bg-black/40 text-center p-2'>{`Tell Your ${text}`}</h1>
      <p className='text-xl font-bold' >Time : {count+':00'}</p>
      {/* <p>hello {transcript}</p> */}
      </div>
      <div className={showmsg?`fixed top-[20%] right-[50%]`:`hidden`}>
      <svg id="Layer_1" className='mic w-20' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='fixed right-[48%] text-2xl font-bold '>listening....</p>
      </div>
      <div className='fixed top-[48%] left-[40%]'>
      <form id='form' action="" method='POST' className=' ' onSubmit={handleSubmit}>
        <input type="text" id='source' placeholder={`Your ${text} Is....`} className='border-2 border-black p-3 text-center rounded-md outline-none w-96' name={text} value={userText} onChange={(e)=> setUserText(e.target.value)}  /> 
        <input type="submit" name="submit" id="submitBtn" className='bg-gray-400 p-2 rounded mx-3 hidden' />
      </form>
      </div>
      <div className='fixed top-[60%] left-[45%] space-x-32'>
        <button className='bg-gray-300 p-1 rounded font-bold'>Back</button>
        <button className='bg-gray-300 p-1 rounded font-bold' >Clear</button>
      </div>
     
      
    </div>
  )
}

export default Voice