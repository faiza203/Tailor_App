import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory();


export class DashBoard extends Component {
    constructor(props: any) {
        super(props);
    }
    getFromFirebase = (tailor: any) => {
        const promise = firebase.firestore().collection('tailors').get().then(function (querySnapshot) {
            querySnapshot.forEach((doc: any) => {
                if (doc === tailor) {
                    console.log(doc);
                    console.log(doc.data());
                }
                else {
                    console.log(doc.data());
                    console.log(tailor);
                }
                console.log(doc);
            })
        });
        promise.then(() => {
        })
        promise.catch((err: any) => {
            alert(err.message);
        })
    }
    getTailor = () => {
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val()
            this.setState = tailor;
        })
    }
    render() {
        const tailor = this.setState;
        return (
            <div>
                <h1 className="h1 font-italic text-muted">{tailor}
                </h1>
                {/* {this.getFromFirebase(tailor)} */}
            </div>
        )
    }
}