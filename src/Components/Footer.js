import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
        <div className='fixed bottom-0 p-3 w-full bg-gradient-to-r from-gray-500 to-black text-black '>
                    <ul className=' flex justify-around items-center'>
                        <li className='bg-gray-400 p-1 rounded font-bold transition-all hover:underline hover:bg-gray-500 cursor-pointer'> <Link to='/Help'>Help</Link> </li>
                        <li className='bg-gray-400 p-1 rounded font-bold transition-all hover:underline hover:bg-gray-500 cursor-pointer'>Contact</li>
                        <li className='bg-gray-400 p-1 rounded font-bold transition-all hover:underline hover:bg-gray-500 cursor-pointer'>About</li>
                    </ul>

                </div>
    </div>
  )
}

export default Footer