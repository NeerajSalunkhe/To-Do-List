import React from 'react'
import './navbar.css'
const navbar = () => {
  return (
    <nav className="nav">
        <div className="logo">
            <span className='itask'>iTask</span>
        </div>
        <ul className='rightnav'>
            <li className='home'>Home</li>
            <li className='tasks'>Tasks</li>
        </ul>
    </nav>
  )
}

export default navbar