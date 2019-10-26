import React, { Component } from 'react'
import logo from '../img/REDS-Logo.png';
import '../css/Navbar.css'

class navbar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <a href="/" className= "logo">
                     <img 
                     src={logo} 
                     alt="RED'S™" title="RED'S™"/>
                     </a>
                     <div className="LogoTitle">Jeans Simulator</div>
                </header>
            </div>
        )
    }
}
export default navbar;