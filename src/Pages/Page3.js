import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
function Page3({lang}) {
const [details,setDetails]=useState({
  train_number:'',
  train_name:'',
  source:'',
  destination:'',
  arrival_time:'',
  departure_time:''
})
const[text,setText]=useState('')
const [show,setShow]=useState(false)
const navigate=useNavigate()
  useEffect(()=>{
    console.log('p5')
   const btn=document.getElementById('btn')
   btn.click()
  },[])

  const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition


  const confirmUser=()=>{
    console.log('confirm')
    const speech=new SpeechSynthesisUtterance()
    speech.lang=lang==='English'?"en-US":"hi-IN"

    speech.text="Are You Sure! Want To Book The Ticket ? If Yes Tell Yes ,Otherwise Tell No . क्या आपको यकीन है! टिकट बुक करना चाहते हैं? यदि हां तो हां बताएं, अन्यथा नहीं बताएं"
    speechSynthesis.speak(speech)
    const recognition = new SpeechRecognition();
    setTimeout(()=>{
    recognition.onstart=()=>{
      setShow(true)
    //  console.log("listening....")
    
    }
    recognition.onresult=(e)=>{
      const transcript=e.results[0][0].transcript
      console.log(transcript)
      if(!text && (transcript==="yes"|| transcript==="han")){
        setText(transcript)
        navigate('/page4')
      }else{
        navigate('/')
      }
    }
    recognition.start()
    },15000)

  }

  const getItemsFromStorage=()=>{
    console.log('click')
    const msg=document.getElementById('msg')
    const errmsg=document.getElementById('errmsg')
    const modal=document.getElementById('modal')
    const btn1=document.getElementById('btn1')
    let storageObj
    setTimeout(()=>{
        storageObj= localStorage.getItem("train_details") 
        let obj1=JSON.parse(storageObj)
        setDetails(obj1)
        if(Object.values(obj1)[0]>0){
          console.log(obj1)          
          msg.style.display="block"
          modal.style.display='block'
          btn1.click()
       }else{
        errmsg.style.display="block"
        setTimeout(()=>{
          navigate('/')
        },3000)
        console.log('train is not available')
      }
    },2000)
    
  }
  return (
    <div className=''>
      <div className={show?`absolute top-[10%] right-[50%]`:`hidden`}>
      <svg id="Layer_1" className='mic w-20' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='fixed right-[48%] text-2xl font-bold '>listening....</p>
      </div>
      <div className='absolute top-[65%] text-center mt-24 mb-10 hidden md:w-[80%] md:left-24' id='modal'>
        <div className='text-center bg-green-400 mb-20'>
          <p className='text-black p-2 w-full text-2xl font-bold'>Are You Sure! Want To Book The Ticket ? If Yes Tell "Yes" Otherwise, Tell "No".</p>
        </div>
      </div>
      <div className='absolute top-14 text-2xl font-bold  bg-green-400 text-green-900 w-full hidden' id='msg'>
       <p className=' text-center p-2'>Train Is Available....!</p> 
      </div>
      <div className='absolute top-28 text-2xl font-bold bg-red-400 text-red-800 w-full hidden' id='errmsg'>
      <p className='text-center p-2'>Train Is Not Available....!</p>
      </div>
      <button className='absolute top-14 right-0 font-bold hidden' id='btn' onClick={getItemsFromStorage}>click</button>
       
     <div className='absolute top-56 text-xl font-bold w-full mt-5 p-5 sm:grid grid-cols-2 gap-y-7 gap-x-16 lg:grid-cols-4 lg:justify-items-center '>
      <p >date of journey: {details.date_of_journey}</p>
      <h1>Train Name: {details.train_name}</h1>
      <h1>Train Number:{details.train_number}</h1>
      <h1>Source:{details.source}</h1>
      <h1>Destintion:{details.destination}</h1> 
      <h1>Arrival Time :{details.arrival_time}</h1>
      <h1>Departure Time:{details.departure_time}</h1>
     </div>
     
      <button className='absolute top-56 hidden' onClick={confirmUser} id='btn1'>click</button>
    </div>
  )
}

export default Page3