import React from 'react';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { checkOrderFirebase } from './index';
export const AddOrder = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const tailor: any = customerState.tailors[0];
    const client: any = customerState.customer[0];
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Orders").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const orders = client.data().orders;
         checkOrderFirebase(clientName, orders, customerState.orders, dispatch)
                })
            });
    }
    promise();

    return (<div>
        <h1 className="h1 text-muted">Orders</h1>
        <p className="text-muted">If you want to stitch new dress: </p>
        <input className="d-inline" type="text" placeholder="Add number of orders here" />
        {customerState.orders.length > 0 ?
            customerState.orders.map((order: any[], index: number) => {
                if (order[0] === client) {
                    return (
                        <p key={index} className="text-muted mt-1">Already Orders are {order[1]}</p>
                    )
                }
            }) :
            null
        }
    </div>)
}