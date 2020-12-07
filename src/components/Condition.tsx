import React from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

export const Condition = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("Condition").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().condition.conditionAmount;
                    const conditionType = client.data().condition.conditionType;
                    console.log(clientName , conditionType , conditionAmount);
                    
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
                    <input className="d-inline form-control" type="text" placeholder="Add condition here" />
                    <input className="d-inline form-control mt-1" type="text" placeholder="Add condition amount here" />
                </div> :
                null
        }
    </div>
    )
}
