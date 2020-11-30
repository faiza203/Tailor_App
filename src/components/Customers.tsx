import React, {  Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history';

// import uuid from 'uuid';

const history = createHistrory();

export class Customers extends Component {
    render() {
        return (
            <div>
                <h2 className="h2 text-muted">Customers</h2>
                <p className="p text-muted">Customer name</p>
                <button className="btn btn-outline-primary">
                Measurement
                </button>
                </div>
        )}}