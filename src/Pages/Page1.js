import React from 'react'
import { Link } from 'react-router-dom'

function Page1() {
  return (
    <div className='bg-gradient-to-r from-black/50 to-white/30 h-screen'>

      <div className='fixed top-[47%] left-[30%] sm:left-[45%]'>
          <button className='bg-white/30 p-2 rounded text-black font-bold hover:bg-white/70 transition-all active:bg-white/50'><Link to='/Form'>Start Booking</Link>
          </button>
      </div>       
    </div>
  )
}

export default Page1