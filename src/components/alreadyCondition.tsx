import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { checkStitch, checkDeliveredFirebase, checkUnStitchFirebase, checkLostFirebase, checkOutOfOrder, checkLost, checkOutOfOrderFirebase } from './store';

export const AlreadyCondition = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const tailor: any = customerState.tailors[0];
    const client: any = customerState.customer[0];
    const promise = () => {
        firebase.firestore().collection('Condition').doc(tailor).collection("Sticthed").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().sticthed;
                    checkStitch(clientName, conditionAmount, customerState, dispatch)
                })
            }).catch();
        firebase.firestore().collection('Condition').doc(tailor).collection("Delivered").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().delivered;
                    checkDeliveredFirebase(clientName, conditionAmount, customerState, dispatch)
                })
            }).catch()
        firebase.firestore().collection('Condition').doc(tailor).collection("UnStitched").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().unstitched;
                    checkUnStitchFirebase(clientName, conditionAmount, customerState, dispatch);
                })
            }).catch()
        firebase.firestore().collection('Condition').doc(tailor).collection("Losted").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().losted;
                    checkLostFirebase(clientName, conditionAmount, customerState, dispatch);
                })
            }).catch()
        firebase.firestore().collection('Condition').doc(tailor).collection("OutOfOrder").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().OutOfOrder;
                    checkOutOfOrder(clientName, conditionAmount, customerState, dispatch);
                })
            }).catch()
    }
    promise();

    return (
        <div id="condition" className="mt-5 text-left ml-5">
            <div className="mt-5">
                {
                    customerState.orders.length > 0 ?
                        customerState.stitch.length > 0 ?
                            customerState.stitch.map((stitch: any[], index: number) => {
                                if (stitch[0] === client) {
                                    return (
                                        <p className="text-muted" key={index}>  {stitch[1]} orders has stitched.</p>
                                    )
                                }
                            }) : null
                        : null
                }
                {
                    customerState.orders.length > 0 ?
                        customerState.delivered.length > 0 ?
                            customerState.delivered.map((deliver: any[], index: number) => {
                                if (deliver[0] === client) {
                                    return (
                                        <p className="text-muted" key={index}>  {deliver[1]} orders has delivered.</p>
                                    )
                                }
                            }) : null
                        : null
                }
                {
                    customerState.orders.length > 0 ?
                        customerState.unStitch.length > 0 ?
                            customerState.unStitch.map((unStitch: any[], index: number) => {
                                if (unStitch[0] === client) {
                                    return (
                                        <p className="text-muted" key={index}>  {unStitch[1]} orders are un stitched.</p>
                                    )
                                } else {
                                    console.log(unStitch[0], client);

                                }
                            }) : null
                        : null
                }
                {
                    customerState.orders.length > 0 ?
                        customerState.lost.length > 0 ?
                            customerState.lost.map((losted: any, index: number) => {
                                if (losted[0] === client) {
                                    return (
                                        <p className="text-muted" key={index}> {losted[1]} orders has losted.</p>
                                    )
                                }
                            }) : null
                        : null
                }
                {
                    customerState.outOfOrder.length > 0 ?
                        customerState.outOfOrder.length > 0 ?
                            customerState.outOfOrder.map((outOfOrder: any, index: number) => {
                                if (outOfOrder[0] === client) {
                                    return (
                                        <p className="text-muted" key={index}> {outOfOrder[1]} orders has wrong stitched.</p>
                                    )
                                }
                            }) : null
                        : null
                }
            </div>
        </div>
    )
}