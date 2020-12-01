import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
    render() {
        return (
            <div id="notFound">
                <div>
                    <h1 className="h1 font-italic text-muted">404 ! </h1>
                    <p className="text-muted">Page not found</p>
                    <Link className="btn btn-outline-dark" to="/">Go To Home</Link>
                </div>
                <img src="https://www.google.com/images/errors/robot.png" alt="" />
            </div>
        )
    }
}