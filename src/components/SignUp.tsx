import React, { Component } from 'react';
import firebase from 'firebase';
import { configFirebase } from './firebase';
import { v4 as uuid } from 'uuid';
import { history } from './history';
import { useSelector, useDispatch } from 'react-redux';
import { initialState } from "./reducer";
import { addTailor } from './store';

configFirebase();

export function SignUp  (){
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const signUpFun = (e: any) => {
        e.preventDefault();
        const [email, password, confirmPassword]: any[] = e.target;
        const auth = firebase.auth();
        if (password.value !== confirmPassword.value) {
            alert("Password does not match");
        }
        else {
            const promise = auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((user) => {
                    alert("Account is created successfully !!!");
                    customerState.tailors.push(user.user?.email);
                    dispatch(addTailor(user.user?.email))
                    history.push('/SignIn');
                    history.replace('./SignIn')
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }
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
