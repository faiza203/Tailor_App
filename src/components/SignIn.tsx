import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistory } from 'history'

const history = createHistory();
const signIn = (e : any) => {
    e.preventDefault();
    const[email , password ] : any[] = e.target;
const auth  = firebase.auth();
  const   promise = auth.signInWithEmailAndPassword(email.value, password.value)
  .then(() => {
    alert("Account is login successfully !!!");
    history.push('/')  
})
  .catch((err) => {
    alert(err.message);
    })
}

const sendToFirebaseSignUp = (e: any) => {
    console.log(e);
    const database = firebase.database().ref();
    console.log(database);

}


export class SignIn extends Component {
    
    render() {
        return (
            <form onSubmit={signIn}>
                <label className="text-dark">Email :</label>
                <input className="form-control" type="email" placeholder="Please write email here" required />
                <label className="text-dark">Password :</label>
                <input  className="form-control" type="password" placeholder="Enter password here" required />
                <button  className="btn btn-outline-danger"type="submit">Sign In</button>
             </form>
        )
    }
}