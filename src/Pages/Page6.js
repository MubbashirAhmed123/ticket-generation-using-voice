import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";
function Page6({lang}) {
    const Razorpay = useRazorpay();
    const[msg,setMsg]=useState(false)
    const[success,setSuccess]=useState(false)
    const[userDetails,setUserDetails]=useState({
        train_number:'',
        train_name:'',
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
    useEffect(()=>{
    const storageData=localStorage.getItem('all_details')
    const actData=JSON.parse(storageData)
    setUserDetails(actData)
    confitmFromUser(actData.ticket_price)
    // eslint-disable-next-line
//   payment()
    },[])
const navigate=useNavigate()
    // useEffect(()=>{
    //     // const btn=document.getElementById('btn')
    //     // btn.click()
    //     confitmFromUser()

    // },[text])
    // confitmFromUser()

    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition

    const payment= async(price)=>{
        console.log("price",price)
        const response = await fetch('http://localhost:4000/payment',
        {
          method:'POST',
          mode:'cors',
          headers:{'Content-type':'application/json'
        },
        body:JSON.stringify({ticket_price:price})
        });
        const res = await response.json();
        if(res.success){
            var options = {
                "key": ""+res.key_id+"",
                "amount": ""+res.amount+"",
                "currency": "INR",
                "name": ""+res.product_name+"",
                "description": ""+res.description+"",
                
                "order_id": ""+res.order_id+"",
                "handler": function (response){
                    alert("Payment Succeeded");
                    let dis=document.getElementById('display')
                   dis.style.display="block"
                   setMsg(false)
                    // window.open("/","_self")
                },
                "prefill": {
                    "contact":""+res.contact+"",
                    "name": ""+res.name+"",
                    "email": ""+res.email+""
                },
                "notes" : {
                    "description":""+res.description+""
                },
                "theme": {
                    "color": "#2300a3"
                }
            };
            console.log(options)
            var razorpayObject = new Razorpay(options);
            razorpayObject.on('payment.failed', function (response){
                alert("Payment Failed");
                
            });
            razorpayObject.open();
        }
        else{
            alert(res.msg);
            
            // setSuccess(true)
            
        }

    }

    const confitmFromUser=(price)=>{
        setTimeout(() => {
        const speech = new SpeechSynthesisUtterance()
        speech.lang="hi-IN"
        speech.text='say yes for payment.भुगतान के लिए हाँ कहें'
        speechSynthesis.speak(speech)
    
    const recognition = new SpeechRecognition();
    
    setTimeout(()=>{
        recognition.onstart=()=>{
            setMsg(true)
        }
    recognition.onresult=(e)=>{
        const transcript= e.results[0][0].transcript
        // setText(transcript)
        console.log(transcript)
        if(transcript==="yes"|| transcript==="han" || transcript==="Yash"){
            payment(price)
        }else{
            navigate('/')
        }
    }
      recognition.start()
    },5000)
    }, 3000);
    }

  return (
    <div>
        <div className={msg?`absolute top-[35%] right-[50%] `:`hidden`}>
      <svg id="Layer_1" className='mic w-10' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.05 122.88"><title>mic-microphone</title><path d="M59.89,20.83V52.3c0,27-37.73,27-37.73,0V20.83c0-27.77,37.73-27.77,37.73,0Zm-14.18,76V118.2a4.69,4.69,0,0,1-9.37,0V96.78a40.71,40.71,0,0,1-12.45-3.51A41.63,41.63,0,0,1,12.05,85L12,84.91A41.31,41.31,0,0,1,3.12,71.68,40.73,40.73,0,0,1,0,56a4.67,4.67,0,0,1,8-3.31l.1.1A4.68,4.68,0,0,1,9.37,56a31.27,31.27,0,0,0,2.4,12.06A32,32,0,0,0,29,85.28a31.41,31.41,0,0,0,24.13,0,31.89,31.89,0,0,0,10.29-6.9l.08-.07a32,32,0,0,0,6.82-10.22A31.27,31.27,0,0,0,72.68,56a4.69,4.69,0,0,1,9.37,0,40.65,40.65,0,0,1-3.12,15.65A41.45,41.45,0,0,1,70,85l-.09.08a41.34,41.34,0,0,1-11.75,8.18,40.86,40.86,0,0,1-12.46,3.51Z"/></svg>
      <p id='msg' className='fixed right-[48%] text-2xl font-bold '>listening....</p>
      </div>
        <h1 className='absolute top-12 text-3xl font-bold text-blue-600 p-5' id='btn' onClick={confitmFromUser}>Ticket Reservation</h1>

        <div className='absolute top-28 '>
            <table className='border-2 border-black grid grid-cols-3 w-screen '>
                <tbody>
                <tr className='flex flex-col text-xl'>
                    <td className='border-b-2 border-r-2 border-black p-2'>Trian Name : {userDetails.train_name}</td>
                    <td className='border-b-2 border-r-2  border-black p-2'>From : {userDetails.source}</td>
                    <td className='border-r-2 border-black p-2'>Boarding Point : {userDetails.source}</td>   
                </tr>
                </tbody>
                <tbody>
                <tr className='flex flex-col text-xl'>
                    <td className='border-b-2 border-r-2 border-black p-2'>Class : {userDetails.seat_type}</td>
                    <td className='border-b-2 border-r-2 border-black p-2'>To : {userDetails.destination}</td>
                    <td className='border-r-2 border-black p-2'>Reservation Upto : {userDetails.destination}</td >   
                </tr>
                </tbody>
                <tbody>
                <tr className='flex flex-col text-xl'>
                    <td className='border-b-2 border-black p-2'>Date : {userDetails.date_of_journey}</td>
                    <td className='border-b-2 border-black p-2'>Time : {userDetails.arrival_time}</td>
                    <td className='p-2' >Quota : {userDetails.seat_type}</td >   
                </tr>
                </tbody>
            </table>
            
        </div>
        <h1 className='absolute top-[40%] text-3xl p-3 font-bold text-blue-600'>Passenger Details</h1>
        <div className='absolute top-[49%]'>
        <table className='w-screen'>
            <thead>
            <tr className='text-xl'>
                <th className='bg-gray-300 p-1 border-r-4 border-white'>SNo</th>
                <th className='bg-gray-300 p-1 border-r-4 border-white'>PNR NUMBER</th>
                <th className='bg-gray-300 p-1 border-r-4 border-white'>Name</th>
                {/* <th className='bg-gray-300 p-1 border-r-4 border-white'>Gender</th> */}
                <th className='bg-gray-300 p-1 border-r-4 border-white'>Seat Number</th>  
            </tr>
            </thead>
            <tbody>
            <tr className='text-center text-xl border-b-2 border-black'>
                <td className='p-3'>1</td>
                <td>{userDetails.PNR_NUMBER}</td>
                <td>{userDetails.passenger_name}</td>
                {/* <td>Male</td> */}
                <td>{userDetails.seat_number}</td>
                
            </tr>
            </tbody>
        </table>
        </div>
        <h1 className='absolute top-[65%] text-3xl font-bold text-blue-600'>Ticket Details</h1>
        <div className='absolute top-[72%]'>
            <table className='w-screen border-2 border-black'>
                <tbody>
                <tr className=''>
                    <td className='p-2 border-r-2 border-black'>Ticket Fare : {userDetails.ticket_price}</td>
                    {/* <td className='p-2 border-r-2 border-black'>Service Charges : 0</td> */}
                    <td className='p-2 border-r-2 border-black '>Total Amount : {userDetails.ticket_price}</td>
                    {/* <td className='p-2'>Availability in {userDetails.seat_type} Quota</td> */}
                
                </tr>
                </tbody>
            </table>
        
        </div>
        <div className='absolute bottom-14 right-10'>
            <div className='items-center hidden' id='display'>
                <img className='w-20 success' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg7vUr0Fj5iMRyrNaOf9SZDYk00T6zTLrPww&usqp=CAU" alt="success" />
                <h1 className='mx-3 font-bold text-xl text-green-600'>Payment Successfull !</h1>
            </div>
            {/* <button to='/payment' onClick={payment} className='bg-orange-500 p-1 rounded mx-5 w-48 text-white font-bold'>Make Payment</button> */}
        

        </div>

    </div>
  )
}

export default Page6