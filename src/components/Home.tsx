import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="h1 font-italic text-muted">Welcome to Tailor App</h1>
                <Link className="btn btn-outline-success" to="/SignUp">Sign Up</Link>
                <Link className="btn btn-outline-primary" to="/SignIn">Sign In</Link>
            </div>
        )
    }
}