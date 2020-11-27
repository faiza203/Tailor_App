import React, { Component } from 'react';
import auth from 'firebase';

export class SignUp extends Component {
    render() {
        console.log(auth);
        return (
            <form>
                <label>Email :</label>
                <input  className="form-control" type="email" placeholder="Please write email here" required />
                <label>Password :</label>
                <input  className="form-control" type="password" placeholder="Enter password here" required />
                <label>Confirm Password :</label>
                <input  className="form-control" type="password" placeholder="Rewrite password here" required />
                <button  className="btn btn-outline-warning" type="submit">SignUp</button>
            </form>
        )
    }
}