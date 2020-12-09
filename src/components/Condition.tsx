import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';
import { checkStitch, checkDeliveredFirebase, checkUnStitchFirebase } from './store';

export const Condition = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("Sticthed").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().sticthed;
                    checkStitch(clientName, conditionAmount, customerState.stitch, dispatch)
                })
            }).catch();
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("Delivered").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().delivered;
                    checkDeliveredFirebase(clientName, conditionAmount, customerState.delivered, dispatch)
                })
            }).catch()
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("UnStitched").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().unstitched;
                    checkUnStitchFirebase(clientName, conditionAmount, customerState.unStitch, dispatch);
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
                    <input className="w-75 d-inline form-control" type="number" placeholder="Add stitched dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add develired dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add un stitched dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add lost dress number" />
                </div> :
                null
        }
        {
            customerState.orders.length > 0 ?
                customerState.stitch.length > 0 ?
                    customerState.stitch.map((stitch: any[], index: number) => {
                        if (stitch[0] === props.client) {
                            return (
                                <p className="text-muted mb-1" key={index}>  {stitch[1]} orders has stitched.</p>
                            )
                        }
                    }) : null
                : null
        }
        {
            customerState.orders.length > 0 ?
                customerState.delivered.length > 0 ?
                    customerState.delivered.map((deliver: any[], index: number) => {
                        if (deliver[0] === props.client) {
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
                        if (unStitch[0] === props.client) {
                            return (
                                // <p  className="text-muted" key={index}>{unStitch[0]}  , {unStitch[1]}</p>
                                <p className="text-muted" key={index}>  {unStitch[1]} orders are un stitched.</p>
                            )
                        } else {
                            console.log(unStitch[0], props.client);

                        }
                    }) : null
                : null
        }
    </div>
    )
}
