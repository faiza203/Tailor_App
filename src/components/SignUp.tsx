import React, { Component } from 'react';
import auth from 'firebase';

const signUp = (e : any) => {
               e.preventDefault();
}
export class SignUp extends Component {
    render() {
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