import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory();

export class DashBoard extends Component {
    constructor(props : any){
        super(props);
    }
    render() {
        firebase.database().ref().on("child_added" , snap => {
            const tailor = snap.val()
            this.setState = tailor;
            })
                return  (
                    <div>
                        <h1 className="h1 font-italic text-muted">
                            {this.setState ? this.setState : "DashBoard"
                        }</h1>
                    </div>
        )
    }
}