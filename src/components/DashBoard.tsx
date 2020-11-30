import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history'
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

export class DashBoard extends Component {
    render() {
        const promise = () => {
            firebase.database().ref().on("child_added", snap => {
                const tailor = snap.val();
                this.setState = tailor;
            });
           return  getFromFirebase(this.setState);
        }
        promise();
        const tailor = this.setState;

        return (
            <div>
                <h1 className="h1 font-italic text-muted">
                    {
                        typeof (tailor) === typeof (() => { }) ? "loading" : tailor
                    }
                </h1>
            </div>
        )
    }
}