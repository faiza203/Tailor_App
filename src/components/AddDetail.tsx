import React from 'react';
import { checkMeasurment, AddOrder, checkOrder, AlreadyMeasurment, history } from './index';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

export const AddDetail = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const client: any = localStorage.getItem("customer");

    const saveDetail: any = (e: any) => {
        e.preventDefault();

        const [Length, Width, Neck, Waist, Middle, LegLenght, NewOrders] = e.target;
        const measurmentEle = {
            Length: Length.value, Width: Width.value, Neck: Neck.value, Waist: Waist.value, Middle: Middle.value, LegLenght: LegLenght.value,
        }

        const tailor: any = localStorage.getItem("tailor");
        firebase.database().ref().on("child_added", snap => {
            const promise = firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").doc(client).set({
                measurmentEle
            });
            promise.then(() => {
                alert("Data is updated");
                checkMeasurment(client, measurmentEle, dispatch, customerState.measurment);
                if (NewOrders.value > 0) { checkOrder(client, NewOrders.value, customerState.orders, dispatch) }
                history.push("/DashBoard");
                history.replace("/DashBoard");
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }
    return (
        <form onSubmit={saveDetail}>
            <div id="addDetail">
                <AlreadyMeasurment client={client} />
                <AddOrder client={client} />
            </div>
            <button id="saveDetail" className="btn btn-outline-primary" type="submit">Save Detail</button>
            <button className="btn btn-outline-success" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Save Without Changing</button>
        </form>
    )
}