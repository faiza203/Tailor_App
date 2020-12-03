import React from "react";
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { history } from './index'
const getClients = (tailor: string, customerState: any) => {
    const firestore = firebase.firestore();
    firestore
        .collection("tailors")
        .doc(tailor)
        .collection('customers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                const customersData = doc.data().id;
                customerState.clients.push(customersData);
            });
        })
        .catch((err) => {
            alert(err.message)
        })

}

export const Customers = (props: any) => {
    const customerState = useSelector((state: any) => state);

    getClients(props.tailor, customerState);

    return (
        <div>
            <h2 className="h2 text-muted">Customers</h2>         {
                customerState.clients.length !== 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        console.log(customer)
                        return (<div key={index}><h3 className="h3 text-muted d-inline mt-2">{customer}</h3>
                            <button id={customer + "measurment"} className="btn btn-outline-success d-inline" onClick={function () {
                                history.push('/AddMeasurment')
                            }} >Measurment</button>
                        </div>)
                    }) :
                    null
            }
        </div>
    );
};

