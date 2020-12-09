import React from 'react';
import { AddOrder, checkOrder, history, AlreadyCondition } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { Condition } from './Condition';
import { checkStitch, checkDelivered, checkUnStitch, checkLost } from './store';
import firebase from 'firebase';

export const AddDetail = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const client: any = localStorage.getItem("customer");
    const tailor: any = localStorage.getItem("tailor");

    const saveDetail: any = (e: any) => {
        e.preventDefault();

        const [NewOrders, sticthed, delivered, unStitched, lost] = e.target;
        if (NewOrders.value > 0) { checkOrder(client, NewOrders.value, customerState.orders, dispatch) }
        if (sticthed.value > 0) {
            checkStitch(client, sticthed.value, customerState.stitch, dispatch)
        }
        if (delivered.value > 0) {
            checkDelivered(client, delivered.value, customerState.delivered, dispatch)
        }
        if (unStitched.value > 0) {
            checkUnStitch(client, unStitched.value, customerState.stitch, dispatch);
        }
        if (lost.value > 0) {
            firebase.firestore().collection('Tailor App').doc(tailor).collection("Lost").doc(client).set({
                losted: parseInt(lost.value)
            }).then().catch();
            checkLost(client, lost.value, customerState.lost, dispatch)
        }
        history.push("/DashBoard");
        history.replace("/DashBoard");
    }
    return (
        <form onSubmit={saveDetail}>
            <div id="addDetail">
                <AddOrder client={client} />
                <Condition client={client} tailor={tailor} />
                <AlreadyCondition client={client} tailor={tailor} />
            </div>
            <button id="saveDetail" className="btn btn-outline-primary" type="submit">Save Detail</button>
            <button className="btn btn-outline-success" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Save Without Changing</button>
        </form>
    )
}