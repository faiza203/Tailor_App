import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Tailor App</h1>
                <Link to="/SignUp">Sign Up</Link>
                <Link to="/SignIn">Sign In</Link>
            </div>
        )
    }
}