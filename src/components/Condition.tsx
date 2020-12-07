import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import firebase from 'firebase';
import { checkConditionFirebase } from './store';

export const Condition = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(props.tailor).collection("Condition").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const conditionAmount = client.data().condition.conditionAmount;
                    const conditionType = client.data().condition.conditionType;
                    checkConditionFirebase(clientName, conditionType, conditionAmount, customerState.condition, dispatch)
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
                    <input className="w-75 d-inline form-control" type="text" placeholder="Add condition here" />
                    <input className="w-75 d-inline form-control mt-1" type="number" placeholder="Add condition amount here" />
                </div> :
                null
        }
        {
            customerState.orders.length > 0 ?
                customerState.condition.length > 0 ?
                    customerState.condition.map((condition: any[], index: number) => {
                        if (condition[0] === props.client) {
                            return (<ul key={index} className="mr-5">
                                <li className="text-muted">  {condition[2]} orders has {condition[1]} .</li>
                            </ul>)
                        }
                    }) :
                    console.log(customerState.condition)
                    
                : null
        }
    </div>
    )
}
