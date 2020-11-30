import React, { Component } from 'react';
import firebase from 'firebase';
import { configFirebase } from './firebase';
import { v4 as uuid } from 'uuid';
import {history} from './history';

configFirebase();
const signUpFun = (e: any) => {
    e.preventDefault();
    const [email, password, confirmPassword]: any[] = e.target;
    const auth = firebase.auth();
    if (password.value !== confirmPassword.value) {
        alert("Password does not match");
    }
    else {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
            .then(() => {
                sendToFirebaseTailor(e);
                history.push('/SignIn');
                history.replace('/SignIn');
            })
            .catch((err) => {
                alert(err.message);
            })
    }
}

const sendToFirebaseTailor = (e : any)=>{
     const promise = firebase.firestore().collection('tailors').doc(e.target[0].value).collection('customers').add({
        id : "customer"
    });
    promise.then(() => {
      alert("Account is created successfully !!!");
      history.push('/SignIn')  ;
      history.replace('./SignIn') 
  })
    .catch((err : any) => {
      alert(err.message);
      })
}
export class SignUp extends Component {
    render() {
        return (
            <form onSubmit={signUpFun}>
                <label className="text-dark">Email :</label>
                <input className="form-control" type="email" placeholder="Please write email here" required />
                <label className="text-dark">Password :</label>
                <input className="form-control" type="password" placeholder="Enter password here" required />
                <label className="text-dark">Confirm Password :</label>
                <input className="form-control" type="password" placeholder="Rewrite password here" required />
                <button className="btn btn-outline-warning" type="submit">SignUp</button>
            </form>
        )
    }
}