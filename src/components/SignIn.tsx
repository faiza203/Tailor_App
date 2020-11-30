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
    sendToFirebaseTailor(e)
})
  .catch((err) => {
    alert(err.message);
    })
}



const sendToFirebaseTailor = (e : any)=>{
    const promise = firebase.database().ref().set({signIn : e.target[0].value})
    promise.then(() => {
      alert("Account is login successfully !!!");
      history.push('/DashBoard')  ;
      history.replace('/DashBoard')  ;  })
    .catch((err : any) => {
      alert(err.message);
      })
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