import React from 'react';
import firebase from 'firebase';
import { Customers, checkCustomer } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { addTailor } from './store';

export function DashBoard() {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const addCustomer = (e: any) => {
        e.preventDefault();
        const customer: String = e.target[0].value;
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

    const tailor = localStorage.getItem("tailor");
    if (customerState.tailors.length === 0) {
        dispatch(addTailor(tailor))
    }
     
    return (
        <div>
            {
                tailor ?
                    <div>
                        <h1 className="h1 font-italic text-muted">
                            {tailor}
                        </h1>
                        <form onSubmit={addCustomer}>
                            <input type="text" className="form-control" placeholder="Add Customer Name Here" required />
                            <button className="btn btn-outline-danger">Add customer
            </button>
                        </form>
                        <Customers name={tailor} />
                    </div>
                    : <h1 className="h1 font-italic text-muted">
                        loading
                        </h1>
            }
        </div>
    )
}
