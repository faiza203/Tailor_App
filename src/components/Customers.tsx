import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
// import { initialState } from "./reducer";

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
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);

    getClients(props.tailor, customerState);
  
    return (
        <div>
            {console.log(customerState)}
            <h2 className="h2 text-muted">Customers</h2>         {
                customerState.clients.length !== 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        console.log(customer)
                        return (<div key={index}><h1>{customer}</h1>
                            <button id={customer + "measurment"}>Measurment</button></div>)
                    }) :
                    console.log("no User")

            }
        </div>
    );
};

