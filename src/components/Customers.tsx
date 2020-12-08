import React from "react";
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { history } from './index';
import { useDispatch } from 'react-redux';
import { checkCustomerFirebase } from "./store";


export const Customers = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc('Tailor').collection(props.name).get()
            .then(snapshot => {
                snapshot.docs.forEach(clients => {
                    const client = clients.data().id;
                    checkCustomerFirebase(client, customerState.clients, dispatch)
                }
                )
            }).catch()
    }
    promise();
    return (
        <div>
            <h2 className="h2 text-muted">Customers</h2>
            {
                customerState.clients.length > 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        return (<div key={index}><h3 className="h3 text-muted d-inline mt-2">{customer}</h3>
                            <button id={customer + "measurment"} className="btn btn-outline-success d-inline" onClick={() => {
                                localStorage.setItem("customer", customer);
                                history.push("/Measurment");
                                history.replace("/Measurment");
                            }}>Measurment</button>
                        </div>)
                    }) :
                    null
            }
        </div>
    );
};
