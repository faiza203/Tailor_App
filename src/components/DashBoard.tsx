import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history';
import { Customers, addCustomer } from './index';
// import uuid from 'uuid';

const history = createHistrory();

export class DashBoard extends Component {
    render() {
        const promise = () => {
            firebase.database().ref().on("child_added", snap => {
                const tailor = snap.val();
                this.setState = tailor;
            });
        }
        promise();
        const tailor = this.setState;
        return (
            <div>
                {
                    typeof (tailor) !== typeof (() => { }) ?
                        <div>
                            <h1 className="h1 font-italic text-muted">
                                {tailor}
                            </h1>
                            <form onSubmit={addCustomer}>
                                <input type="text" className="form-control" placeholder="Add Customer Name Here" required />
                                <button className="btn btn-outline-danger">Add customer
            </button>
                            </form>
                            <Customers name={tailor} />
                        </div>
                        : <h1 className="h1 font-italic text-muted">
                            loading
                        </h1>
                }
            </div>
        )
    }
}