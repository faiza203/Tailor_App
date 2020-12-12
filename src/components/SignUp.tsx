import React from 'react';
import firebase from 'firebase';
import { configFirebase } from './firebase';
import { history } from './history';
import { useDispatch } from 'react-redux';
import { addTailor } from './store';

configFirebase();

export function SignUp() {
    const dispatch = useDispatch();
    const signUpFun = (e: any) => {
        e.preventDefault();
        const [email, password, confirmPassword]: any[] = e.target;
        const auth = firebase.auth();

        if (password.value !== confirmPassword.value) {
            alert("Password does not match");
        }
        else if (email.value === password.value) {
            alert("You have written email as password . Please change it for secure account")
        }
        else {
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((user) => {
                    alert("Account is login successfully !!!");
                    history.push('/DashBoard');
                    history.replace('/DashBoard');
                    dispatch(addTailor(user.user?.email));
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }
    return (
        <div className="main">
            <form onSubmit={signUpFun} className="form">
                {/* <label className="text-dark">Email :</label>
            <input className="form-control" type="email" placeholder="Please write email here" required />
            <label className="text-dark">Password :</label>
            <input className="form-control" type="password" placeholder="Enter password here" required />
            <label className="text-dark">Confirm Password :</label>
            <input className="form-control" type="password" placeholder="Rewrite password here" required />
       <button className="btn btn-outline-warning" type="submit">SignUp</button> */}
                <h2>Register With Us</h2>
                <label>Email :</label>
                <input type="email" placeholder="Please write email here" required />
                <label >Password :</label>
                <input type="password" placeholder="Enter password here" required />
                <label >Confirm Password :</label>
                <input type="password" placeholder="Rewrite password here" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
