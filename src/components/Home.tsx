import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <div className='homePage'>
                <h1 className="h1 font-italic text-muted">Welcome to Tailor App</h1>
                <div>
                <Link className="btn btn-outline-dark" to="/SignUp">Sign Up</Link>
                <Link className="btn btn-outline-dark" to="/SignIn">Sign In</Link>
                </div>
                <img height="350"  src="https://images-na.ssl-images-amazon.com/images/I/41aTFrD3D9L._SX425_.jpg" alt=""/>
            </div>
        )
    }
}