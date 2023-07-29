import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
function Pag5({lang}) {
  const [msg,setMsg]=useState(false)
  
  const [details,setDetails]=useState({
    train_number:'',
    tarin_name:'',
    arrival_time:'',
    PNR_NUMBER:'',
    passenger_name:'',
    seat_number:'',
    ticket_price:0,
    date_of_journey:'',
    seat_type:'',
    source:'',
    destination:''
  })
  const [seat,setSeat]=useState({
    seatType:''
  })
  const [seatDetails,setSeatDetails]=useState({
   train_number:'',
   'availability of first tier AC':'',
   'availability of second tier AC':'',
   'availability of third tier AC':'',
   'availability of sleeper seat':'',
   'availability of general seat':'',
  'price of AC first tier':'',
  'price of AC second tier':'',
  'price of AC third tier':'',
  'price of sleeper':'',
  'price of general':'',
    })
    const navigate=useNavigate()
    let finalObj={}
    useEffect(()=>{
      getFromLoaclStorage()
      getSeat()
    },[])
    useEffect(()=>{
      getFromLoaclStorage()
    
      const {seatType}=seat
      if(seatType){
        async function sendToServer() {
          const response = await fetch('http://localhost:4000/user_seat',
          {
            method:'POST',
            mode:'cors',
            headers:{'Content-type':'application/json'
          },
          body:JSON.stringify(finalObj)
          });
          const res = await response.json();
          return res;
        }
        sendToServer().then(result=>{ 
          console.log(result)  
          localStorage.setItem('all_details',JSON.stringify(result))
          navigate('/page6')
        }).catch(()=>{
          console.log('error')
        })
      }else{
        console.log('no seat')
      }
      // eslint-disable-next-line
      },[seat])
  
  const getFromLoaclStorage=()=>{
    console.log('hello')
    let seatData=localStorage.getItem('seat_details')
    let data=JSON.parse(seatData)
    setSeatDetails(data)
    let userDetails=localStorage.getItem('user_details')
    let userData=JSON.parse(userDetails)
    console.log(userData.name)
    let train_details=localStorage.getItem('train_details')
    let trainData=JSON.parse(train_details)
    console.log(trainData.date_of_journey)
     finalObj={
      train_number:trainData.train_number,
      train_name:trainData.train_name,
      arrival_time:trainData.arrival_time,
      PNR_NUMBER:userData.pnr_number,
      passenger_name:userData.name,
      seat_number:'S'+Math.floor(Math.random() *10),
      ticket_price:seatDetails["price of "+seat.seatType],
      date_of_journey:trainData.date_of_journey,
      seat_type:seat.seatType,
      source:trainData.source,
      destination:trainData.destination
    }
    setDetails(finalObj)
    console.log(finalObj)
    console.log("state obj",details)
    console.log("final",finalObj)
    console.log(seat.seatType)
    console.log(seatDetails['price of '+seat.seatType])
    console.log(data)
    
  }
  const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

  const getSeat=()=>{
    setTimeout(() => {
      
    console.log('say seat type')
    const speech = new SpeechSynthesisUtterance()
    speech.lang="hi-IN"
    speech.text="please say seat type.कृपया सीट का प्रकार बताएं"
  speechSynthesis.speak(speech)
 
    const recognition=  new SpeechRecognition()
    setTimeout(()=>{
      setMsg(true)

  // console.log('after 3sec')
  recognition.onresult=(e)=>{
    const transcript= e.results[0][0].transcript
    if(transcript==='AC first tier'|| transcript==='AC second tier'|| transcript==='AC third tier'|| transcript==='general'|| transcript==='sleeper' ){
      setSeat({...seat,seatType:transcript})
    }else{
      console.log('wron seat type')
      console.log(transcript)
    //   if(!seat.seatType){
    // getSeat()
    //   }
    }
  }
  // localStorage.setItem('user_details',{seat_type:seat.seatType})
  recognition.start()
console.log('after transcript')
    },5000)
  
}, 3000);
  }

  return (
    <div>
      <div className={msg?`absolute right-[50%] mt-20`:`hidden`}>
      <svg id="Layer_1" className='mic w-10' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='absolute text-2xl font-bold '>listening....</p>
      </div>
      <div className='absolute top-[30%] left-[35%]'>
        <table className='border-2 border-black w-[550px] text-center'>
          <thead className='border-b border-2 border-black bg-gray-500'>
            <tr className='text-2xl text-gray-700 font-serif'>
              <th className='border-r-2 border-black p-2'>Seat Type</th>
              <th className='border-r-2 border-black'>Availability</th>
              <th className='border-r-2 border-black'>Price Per Seat</th>
            </tr>
          </thead>
          
          <tbody>
            <tr className='border-2 border-black font-bold bg-gray-300'>
              <td className='border-r-2 border-black p-2'>AC 1st tier</td> 
              <td className='border-r-2 border-black'>{seatDetails['availability of first tier AC']}</td>
              <td>{seatDetails['price of AC first tier']}</td>
            </tr>
            </tbody>
            
            <tbody>
            <tr className='border-2 border-black font-bold'>
              <td className='border-r-2 border-black p-2'>AC 2nd tier</td>
              <td className='border-r-2 border-black'>{seatDetails['availability of second tier AC']}</td>
              <td>{seatDetails['price of AC second tier']}</td>
            </tr>
            </tbody>
            <tbody>
            <tr className='border-2 border-black font-bold bg-gray-200'>
              <td className='border-r-2 border-black p-2'>AC 3rd tier</td>
              <td className='border-r-2 border-black'>{seatDetails['availability of third tier AC']}</td>
              <td>{seatDetails['price of AC third tier']}</td>
            </tr>
            </tbody>
            <tbody>
            <tr className='border-2 border-black font-bold bg-white'>
              <td className='border-r-2 border-black p-2'>Sleeper</td>
              <td className='border-r-2 border-black'>{seatDetails['availability of sleeper seat']}</td>
              <td>{seatDetails['price of sleeper']}</td>
            </tr>
            </tbody>
            <tbody>
            <tr className='font-bold bg-gray-300'>
              <td className='border-r-2 border-black p-2 '>General</td>
              <td className='border-r-2 border-black'>{seatDetails['availability of general seat']}</td>
              <td >{seatDetails['price of general']}</td>
            </tr>
          </tbody>
        </table>
        {/* <h1>AC 1st tier :{seatDetails['availability of first tier AC']}</h1>
        <h1>AC 2nd tier :{seatDetails['availability of second tier AC']}</h1>
        <h1>AC 3rd tier :{seatDetails['availability of third tier AC']}</h1>
        <h1>sleeper :{seatDetails['availability of sleeper seat']}</h1>
        <h1>general :{seatDetails['availability of general seat']}</h1>
        <h1>price of 1st tier AC : {seatDetails['price of AC first tier']}</h1>
        <h1>price of 1st tier AC : {seatDetails['price of AC second tier']}</h1>
        <h1>price of 1st tier AC : {seatDetails['price of AC third tier']}</h1>
        <h1>price of sleeper : {seatDetails['price of sleeper']}</h1>
        <h1>price of general : {seatDetails['price of general']}</h1>
        */}
      </div> 
      <div className='absolute top-[70%] left-[40%]'>
      <form action="">
      <label htmlFor="seatType" className='text-xl font-bold mb-1'>Seat Type : </label>
      <input type="text" name="seatType" id="seatType" className='focus:outline-none rounded-md p-2 bg-gray-200 border-2 border-black shadow-md focus:bg-white transition focus:border-gray-200 mb-3'  value={seat.seatType} onChange={(e)=> setSeat({...seat,seatType:e.target.value})} />
      {/* <input type="button" name="" id="btn" className='hidden' onClick={getSeat} /> */}
        
      </form>
      </div>
    </div>
  )
}

export default Pag5