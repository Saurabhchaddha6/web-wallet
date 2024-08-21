import React from 'react'
import ThemeButton from './ThemeButton'
import { BookDashed } from 'lucide-react'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center m-2'>
      <div className='flex items-center p-4'>
        <BookDashed className='size-10 mr-2' />
        <span>Web-Based Wallet</span>
      </div>
      <div className='flex p-4'>
        <ThemeButton />
      </div>
    </div>
  )
}

export default NavBar