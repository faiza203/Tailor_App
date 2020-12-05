import React from 'react';
import firebase from 'firebase';
import { Customers } from './index';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerR } from './store';

export function DashBoard() {
    const dispatch = useDispatch();
    const addCustomer = (e: any) => {
        e.preventDefault();
        const customer: String = e.target[0].value;
        e.target[0].value = "";
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val();
            const id = uuid();
            const promise = firebase.firestore().collection('Tailor App').doc('tailor').collection(tailor).doc(id).set({
                id: customer
            });
            promise.then(() => {
                alert("customer is added");
                dispatch(addCustomerR(customer))
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }

    const promise = () => {
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val();
            localStorage.setItem("tailor", tailor)
        });
    }
    promise();
    const tailor = localStorage.getItem("tailor");
    return (
        <div>
            {
                typeof (tailor) !== typeof (() => { }) ?
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
