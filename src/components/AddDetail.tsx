import React from 'react';
import { AddMeasurment, addMeasurmentR, AddOrder } from './index';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { checkOrder } from './store';

export const AddDetail = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);

    const saveDetail: any = (e: any) => {
        const client: any = localStorage.getItem("customer");
        e.preventDefault();
        const [Length, Width, Neck, Waist, Middle, LegLenght, NewOrders] = e.target;
        const measurmentEle = [Length.value, Width.value, Neck.value, Waist.value, Middle.value, LegLenght.value];
        firebase.database().ref().on("child_added", snap => {
            const tailor = snap.val();
            localStorage.setItem("tailor", tailor)
        });
        const tailor: any = localStorage.getItem("tailor");
        firebase.database().ref().on("child_added", snap => {
            const id = uuid();
            const promise = firebase.firestore().collection('clients').doc(tailor).collection('customers').doc(client).set({
                measurment: measurmentEle
            });

            promise.then(() => {
                alert("Data is updated");
                dispatch(addMeasurmentR(client, measurmentEle));
                NewOrders.value > 0 ? firebase.firestore().collection('clients').doc(tailor).collection('customers').doc(client).set({
                    measurment: measurmentEle
                }).then(() => {
                    checkOrder(client, NewOrders.value, customerState, dispatch)
                    console.log(customerState);

                }).catch((err) => {
                    alert(err);
                }) : console.log(0);
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }
    return (
        <form onSubmit={saveDetail}>
            <div id="addDetail">
                <AddMeasurment />
                <AddOrder />
            </div>
            <button id="saveDetail" className="btn btn-outline-primary" type="submit">Save Detail</button>
        </form>
    )
}