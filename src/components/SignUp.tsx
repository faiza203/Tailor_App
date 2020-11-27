import React, { Component ,  useState } from 'react';
import firebase from 'firebase';

export const  SignUp = () => {
        const [email, setEmail] : any[] = useState("");
        const [password, setPassword] : any[] = useState("");
        const [confirmPassword, setConfirmPassword] : any[] = useState("");
    
const signUp = (e : any) => {

    const auth = firebase.auth;
    e.preventDefault();
    if(password.value !== confirmPassword.value){
        alert("Password does not match")
    }          
    else{
        console.log(auth());
        
    //   const   promise = auth.signUpWithEmailAndPassword(email, password);
    }
    
}
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