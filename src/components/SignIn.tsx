import React, { Component } from 'react';
import auth from 'firebase';

export class SignIn extends Component {
    render() {
        console.log(auth);
        return (
            <form>
                <label className="text-muted">Email :</label>
                <input className="form-control" type="email" placeholder="Please write email here" required />
                <label className="text-muted">Password :</label>
                <input  className="form-control" type="password" placeholder="Enter password here" required />
                <button  className="btn btn-outline-danger"type="submit">Sign In</button>
             </form>
        )
    }
}