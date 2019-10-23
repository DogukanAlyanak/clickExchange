import React, { Component } from 'react'
import '../css/Navbar.css'

class navbar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <a href="/" className= "logo">
                     LaJeans™
                     </a>
                </header>
                <hr/>
            </div>
        )
    }
}
export default navbar;