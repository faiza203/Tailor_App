import React from 'react';
import firebase from 'firebase';
import { history } from './history';
import { useDispatch } from 'react-redux';
import { addTailor } from './store';



export function SignIn() {
  const dispatch = useDispatch();
  const signIn = (e: any) => {
    e.preventDefault();
    const [email, password]: any[] = e.target;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        dispatch(addTailor(e.target[0].value));
        alert("Account is login successfully !!!");
        history.push('/DashBoard');
        history.replace('/DashBoard');
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  return (
    <form onSubmit={signIn}>
      <label className="text-dark">Email :</label>
      <input className="form-control" type="email" placeholder="Please write email here" required />
      <label className="text-dark">Password :</label>
      <input className="form-control" type="password" placeholder="Enter password here" required />
      <button className="btn btn-outline-danger" type="submit">Sign In</button>
    </form>
  )
}