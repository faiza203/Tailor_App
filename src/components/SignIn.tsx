import React, { Component } from 'react';
import auth from 'firebase';

export class SignIn extends Component {
    render() {
        console.log(auth);
        return (
            <form>
                <label>Email :</label>
                <input type="email" placeholder="Please write email here" required />
                <label>Password :</label>
                <input type="password" placeholder="Enter password here" required />
                <button type="submit">Sign In</button>
             </form>
        )
    }
}