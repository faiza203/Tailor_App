import React from 'react';
import firebase from 'firebase';
import { Customers, checkCustomer, history } from './index';
import { useDispatch, useSelector } from 'react-redux';

export function DashBoard() {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const addCustomer = (e: any) => {
        e.preventDefault();
        const customer: string = e.target[0].value;
        checkCustomer(customer, customerState.clients, dispatch);
        e.target[0].value = "";
    }
    const promiseOne = () => {
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val();
            localStorage.setItem("tailor", tailor);
        });
    }
    promiseOne();

    return (
        <div>
            {
                customerState.tailors[0] ?
                    <div>
                        <h1 className="h1 font-italic text-muted">
                            {customerState.tailors[0]}
                        </h1>
                        <form onSubmit={addCustomer}>
                            <input type="text" className="form-control" placeholder="Add Customer Name Here" required />
                            <button className="btn btn-outline-danger">Add customer
            </button>
                        </form>
                        <Customers name={customerState.tailors[0]} />
                    </div>
                    :
                    <div>
                        <h1 className="h1 font-italic text-muted">
                            Please login first
                         </h1>
                        <button className="btn btn-outline-danger" onClick={
                            () => { history.push('/SignIn')
                        history.replace('/SignIn') }
                        }>
                            Go to Sign In
                         </button>
                    </div>
            }
        </div>
    )
}
