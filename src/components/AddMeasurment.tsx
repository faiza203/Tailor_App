import React, { useState } from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { checkFirebaseMeasurment } from './index';
import { checkOrder } from './store';
export function AddMeasurment(props: any) {
    const tailor: any = localStorage.getItem("tailor");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const measurment = client.data().measurmentEle;
                    checkFirebaseMeasurment(clientName, measurment, dispatch, customerState.measurment)
                })
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
