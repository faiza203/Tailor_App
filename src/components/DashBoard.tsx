import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history';
import { Customers } from './index';
// import uuid from 'uuid';

const history = createHistrory();


const getFromFirebase = (tailor: any) => {
    const promise = firebase.firestore().collection('tailors').get().then(function (querySnapshot) {
        querySnapshot.forEach((doc: any) => {
            console.log(doc);
        })
    });
    promise.then(() => {
    })
    promise.catch((err: any) => {
        alert(err.message);
    })
}

const addCustomer = (e : any) => {
    e.preventDefault();
    const customer : String = e.target[0].value ;
    console.log(customer);
}
export class DashBoard extends Component {
    render() {
        const promise = () => {
            firebase.database().ref().on("child_added", snap => {
                const tailor = snap.val();
                this.setState = tailor;
            });
            return getFromFirebase(this.setState);
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
                                <input type="text" placeholder="Add Customer Name Here" />
                                <button className="btn btn-outline-danger">Add customer
            </button>
                            </form>                             <Customers />
                        </div>
                        : <h1 className="h1 font-italic text-muted">
                            loading
                        </h1>
                }
            </div>
        )
    }
}