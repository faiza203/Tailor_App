import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
    render() {
        return (
            <div>
                <h1 className="h1 font-italic text-muted">404 ! </h1>
                <p>Page not found</p>
                <div>
                            <Link className="btn btn-outline-dark" to="/">Go To Home</Link>
                </div>
            </div>
        )
    }
}