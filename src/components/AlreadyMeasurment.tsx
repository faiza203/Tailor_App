import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { AddMeasurment , checkFirebaseMeasurment } from './index';
import firebase from 'firebase';

export function AlreadyMeasurment(props: any) {
    const tailor: any = localStorage.getItem("tailor");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const measurment = client.data().measurmentEle;
                    checkFirebaseMeasurment(clientName, measurment, dispatch, customerState.measurment);
                })
            }).catch()
    }
    promise();
    
    return (
        <div >
            <div id="Measurment">
                {customerState.measurment.length > 0 ?
                    customerState.measurment.map((measurment: any[], index: number) => {
                        if (measurment[0] === props.client) {
                            return (<ul key={index} className="mr-5">
                                <li className="text-muted"> Length : {measurment[1].Length}</li>
                                <li className="text-muted"> Width : {measurment[1].Width}</li>
                                <li className="text-muted"> Neck : {measurment[1].Neck}</li>
                                <li className="text-muted"> Waist : {measurment[1].Waist}</li>
                                <li className="text-muted"> Middle : {measurment[1].Middle}</li>
                                <li className="text-muted"> Leg Lenght : {measurment[1].LegLenght}</li>
                            </ul>)
                     }
                     }) :
                    null
                }
            </div>
        </div>
    )
}
