import React, { useState } from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { checkFirebaseMeasurment } from './index';
export function AddMeasurment(props: any) {
    const tailor: any = localStorage.getItem("tailor");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc('Clients').collection(tailor).get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientIndex = client.id.search(" ");
                    const clientType = client.id;
                    const clientName = clientType.slice(0, clientIndex);
                    console.log(clientName);
                    
                    const measurment = client.data().measurmentEle;
                    checkFirebaseMeasurment(clientName, measurment, dispatch, customerState.measurment)
                }
                )
            }).catch()
    }
    promise();
    return (

        <div>
            <input className="form-control" type="text" placeholder="Length" required />
            <input className="form-control mt-1" type="number" placeholder="Width" required />
            <input className="form-control mt-1" type="number" placeholder="Neck" required />
            <input className="form-control mt-1" type="number" placeholder="Waist" required />
            <input className="form-control mt-1" type="number" placeholder="Middle" required />
            <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required />
        </div>
    )
}
