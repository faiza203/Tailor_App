import React, { Component } from 'react';
import firebase from 'firebase';
import { configFirebase } from './firebase';
import { createBrowserHistory as createHistory } from 'history'
const history = createHistory();
configFirebase();
const signUp = (e : any) => {
    e.preventDefault();
    const[email , password , confirmPassword] : any[] = e.target;
const auth  = firebase.auth();
if(password.value !== confirmPassword.value){
    alert("Password does not match");
}          
else{
  const   promise = auth.createUserWithEmailAndPassword(email.value, password.value)
  .then(() => {
      sendToFirebaseTailor(e);
})
  .catch((err : any) => {
    alert(err.message);
    })
}
}
const sendToFirebaseTailor = (e : any)=>{
    // const promise = firebase.firestore().collection('tailors').doc(e.target[0].value).collection('customers').add({
    //     id1 : "id1"
    // });
     const promise = firebase.firestore().collection('tailors').doc(e.target[0].value).collection('customers').add({
        id1 : "id1"
    });
    promise.then(() => {
      alert("Account is created successfully !!!");
      history.push('/SignIn')  
  })
    .catch((err : any) => {
      alert(err.message);
      })
}
export class  SignUp extends Component {
    render(){
        return (
            <form onSubmit={signUp}>
                <label className="text-dark">Email :</label>
                <input  className="form-control" type="email" placeholder="Please write email here" required />
                <label className="text-dark">Password :</label>
                <input  className="form-control" type="password" placeholder="Enter password here" required />
                <label className="text-dark">Confirm Password :</label>
                <input  className="form-control" type="password" placeholder="Rewrite password here" required />
                <button  className="btn btn-outline-warning" type="submit">SignUp</button>
            </form>
        )
    }
}