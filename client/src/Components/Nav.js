import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/MainPage'>Main</Link></li>
        <li><Link to="/Create_Account">Create Account</Link></li>
      </ul>
    </nav>
  </header>
)

export default Nav
