import React, {  Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history';

// import uuid from 'uuid';

const history = createHistrory();

export class Customers extends Component {
    render() {
        return (
            <div>
                <h1 className="h1">Customers</h1>
                <h1 className="h1">Customer name</h1>
                <button className="btn btn-outline-primary">
                Measurement
                </button>
                </div>
        )}}