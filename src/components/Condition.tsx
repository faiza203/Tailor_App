import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import {  checkStitch } from './store';

export const Condition = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("Condition").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().condition.conditionAmount;
                    checkStitch(clientName, conditionAmount , customerState.stitch, dispatch)
                })
            }).catch()
    }
    promise();

    return (<div>
        {
            customerState.orders.length > 0 ?
                <div className="condition">
                    <h1 className="h1 text-muted">Condition</h1>
                    <p className="text-muted">If you want to add Condition : </p>
                    <input className="w-75 d-inline form-control" type="text" placeholder="Add stitched dress number" />
                </div> :
                null
        }
        {
            customerState.orders.length > 0 ?
                customerState.stitch.length > 0 ?
                    customerState.stitch.map((stitch: any[], index: number) => {
                        if (stitch[0] === props.client) {
                            return (<ul key={index} className="mr-5">
                                <li className="text-muted">  {stitch[1]} orders has stitched.</li>
                            </ul>)
                        }
                    }) : console.log(customerState)
                : null
        }
    </div>
    )
}
