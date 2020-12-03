import React from 'react';
import { addMeasurmentR } from './index';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

export function AddMeasurment() {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);

    const addMeasurmentFun: any = (e: any) => {
        const client: any = localStorage.getItem("customer")
        e.preventDefault();
        const [Length, Width, Neck, Waist, Middle, LegLenght] = e.target;
        const measurmentEle = [Length.value, Width.value, Neck.value, Waist.value, Middle.value, LegLenght.value];
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val();
            localStorage.setItem("tailor", tailor)
        });
        const tailor : any = localStorage.getItem("tailor");
        firebase.database().ref().on("child_added", snap => {
            const id = uuid();
            const promise = firebase.firestore().collection('clients').doc(tailor).collection('customers').doc(client).set({
                measurment: measurmentEle
            });
            promise.then(() => {
                alert("Measurment is added");
                dispatch(addMeasurmentR(client, measurmentEle));
                console.log(customerState);
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }
    return (
        <form onSubmit={addMeasurmentFun}>
            <label className="h1 text-muted text-dark">Measurment</label>
            <input className="form-control" type="text" placeholder="Length" required />
            <input className="form-control mt-1" type="number" placeholder="Width" required />
            <input className="form-control mt-1" type="number" placeholder="Neck" required />
            <input className="form-control mt-1" type="number" placeholder="Waist" required />
            <input className="form-control mt-1" type="number" placeholder="Middle" required />
            <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required />
            <button id="saveMeasurment" className="btn btn-outline-primary" type="submit">Save Measurment</button>
        </form>
    )
}
