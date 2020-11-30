import React, { Component } from 'react';
import firebase from 'firebase';
import { createBrowserHistory as createHistrory } from 'history';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
// import uuid from 'uuid';

const history = createHistrory();


export const Customers = (props: any) => {
    let customers: any[] = [];
    let customersData: any[] = [];
    {
        firebase.firestore().collection("tailors")
            .doc(props.name)
            .collection('customers')
            .get()
            .then((querySnapshot: any) => {
                querySnapshot.forEach(function (doc: any) {
                    const customersData = doc.data().id;
                    customers.push(customersData);
                });
            })
            .catch((err: any) => {
                alert(err.message)
            })
    }

    return (
        <div>
            <h2 className="h2 text-muted">Customers</h2>
            {
                customers.forEach(function( i , customer){
                    return (
                        <div key={i}>
                            <p className="p text-muted">{customer}</p>
                            <button className="btn btn-outline-primary">
                                Measurement
                </button>
                        </div>
                    )
                })
            }
        </div >
    )
}

