import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Nav extends Component {
    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Navbar</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/SignUp" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/SignIn" className="nav-link">Sign In</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
