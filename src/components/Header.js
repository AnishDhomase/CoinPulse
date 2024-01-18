import React from 'react'
import { Link } from 'react-router-dom'
import { RiBitCoinFill } from "react-icons/ri";
import './Header.css';
const Header = ({activeMember}) => {
  return (
    <div className='navbar'>
      <div className="logo">
        <h2>CoinPulse</h2>
        <RiBitCoinFill color='#5f8cff' size={"25"} /> 
      </div>
      <ul>
          <li className={ activeMember === 'home' ? "active" : ""} > <Link to='/'>Home</Link> </li>
          <li className={ activeMember === 'coin' ? "active" : ""}> <Link to='/coins'>Coin Analysis</Link></li>
      </ul>
    </div>
  )
}

export default Header