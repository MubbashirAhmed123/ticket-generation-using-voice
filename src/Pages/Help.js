import React from 'react'

function Help() {
  return (
    <div className=''>
        <div className='absolute text-center top-16 bg-gray-100 p-2 w-full '>
            <p className='text-xl font-bold '>WELCOME TO MMW TRAIN BOOKING SYSTEM</p>
        </div>
        <div className='absolute top-32 w-full h-screen bg-gray-300 mt-5'>
            <ul className=' space-y-4 mx-5 mt-3 list-disc'>
            <li>First Click On <span className='font-bold'>Start Booking</span> Button .</li>
            <li>Total Time to tell <span className='font-bold'>Source , Destination , Date Of Journey</span> Is <span className='font-bold'>Maximun 25 Seconds </span> .</li>
            <li>After Asking The <span className='font-bold'>Source,</span> Tell Your Source</li>
            <li>After Asking The <span className='font-bold'>Destination,</span> Tell Your Destination</li>
            <li>After Asking The <span className='font-bold'>Date,</span> Tell The Date Of Your Journey</li>
            <li>If The Train Is Available At <span className='font-bold'>The Date You Want To Go</span>, It Will Show The Details That The <span className='font-bold'>Train Is Available</span>. Otherwise, It Will Show <span className='font-bold'>Train Is Not Available</span>. </li>

            <li>If You Want To Book The Train Of The <span className='font-bold'>Same Source,Destination And Date Of Journey</span> So Tell <span className='font-bold'>"Yes"</span> Otherwise Tell <span className='font-bold'>"No"</span>.</li>
            </ul>
        </div>
    </div>
  )
}

export default Help