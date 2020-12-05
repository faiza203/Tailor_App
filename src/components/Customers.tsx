import React from "react";
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { history } from './index';
import { useDispatch } from 'react-redux';
import { addCustomerR } from "./store";
const GetClients = (tailor: string) => {
    const dispatch = useDispatch();
    const firestore = firebase.firestore();
    firestore
        .collection("tailors")
        .doc(tailor)
        .collection('customers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                const customersData = doc.data().id;
                dispatch(addCustomerR(customersData))
            });
        })
        .catch((err) => {
            alert(err.message)
        })
}

export const Customers = (props: any) => {
    const customerState = useSelector((state: any) => state);

    GetClients(props.tailor);

    return (
        <div>
            <h2 className="h2 text-muted">Customers</h2>

            {
                customerState.clients.length !== 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        return (<div key={index}><h3 className="h3 text-muted d-inline mt-2">{customer}</h3>
                            <button id={customer + "measurment"} className="btn btn-outline-success d-inline" onClick={() => {
                                localStorage.setItem("customer", customer);
                                history.push("/AddDetail");
                                history.replace("/AddDetail")
                            }}>Edit Detail</button>
                        </div>)
                    }) :
                    null
            }
        </div>
    );
};

