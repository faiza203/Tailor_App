import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="h1 font-italic text-muted">Welcome to Tailor App</h1>
                <Link className="btn btn-outline-dark" to="/SignUp">Sign Up</Link>
                <Link className="btn btn-outline-dark" to="/SignIn">Sign In</Link>
                <img src="https://thumbs.dreamstime.com/z/tailor-vector-logo-sewing-machine-logo-template-fashion-logo-sewing-machine-vector-icon-tailor-vector-logo-sewing-machine-logo-134228280.jpg" alt=""/>
            </div>
        )
    }
}