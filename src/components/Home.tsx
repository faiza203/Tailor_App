import React, { Component } from 'react';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Tailor App</h1>
                <button id="SignUpBtn">Sign Up</button>
                <button id="SignInBtn">Sign In</button>
            </div>
        )
    }
}