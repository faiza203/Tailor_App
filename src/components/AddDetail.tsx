import React from 'react';
import { AddOrder, checkOrder, history, AlreadyCondition } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { Condition } from './Condition';
import { checkStitch, checkDelivered, checkUnStitch, checkLost, checkOutOfOrder, deleteClient } from './store';

export const AddDetail = () => {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const client: any = customerState.customer[0];
    const tailor: any = customerState.tailors[0];

    const saveDetail: any = (e: any) => {
        e.preventDefault();

        const [NewOrders, sticthed, delivered, unStitched, lost, outOfOrder] = e.target;
        if (NewOrders) {
            if (NewOrders.value > 0) {
                checkOrder(client, NewOrders.value, customerState, dispatch)
            }
        }

        if (sticthed) {

            if (sticthed.value > 0) {
                checkStitch(client, sticthed.value, customerState.stitch, dispatch)
            }
        }

        if (delivered) {
            if (delivered.value > 0) {
                checkDelivered(client, delivered.value, customerState.delivered, dispatch)
            }
        }
        if (unStitched) {

            if (unStitched.value > 0) {
                checkUnStitch(client, unStitched.value, customerState.unStitch, dispatch);
            }
        }
        if (lost) {
            if (lost.value > 0) {
                checkLost(tailor, client, lost.value, customerState.lost, dispatch)
            }
        }
        if (outOfOrder) {
            if (outOfOrder.value > 0) {
                checkOutOfOrder(tailor, client, outOfOrder.value, customerState.outOfOrder, dispatch)
            }
        }
        history.push("/DashBoard");
        history.replace("/DashBoard");
        dispatch(deleteClient());
    }
    return (
        <div>     {
            customerState.tailors[0] ?
                <form onSubmit={saveDetail}>
                    <div className="d-flex w-100">
                        <AddOrder />
                        <Condition />
                        <AlreadyCondition />
                    </div>
                    <button id="saveDetail" className="btn btn-outline-primary d-inline w-25" type="submit" >Add</button>
                    <button className="btn btn-outline-success d-inline w-50" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard'); dispatch(deleteClient()) }
                    }>Cancle</button>
                </form > :
                <div>
                    <h1 className="h1 font-italic text-muted">
                        Please login first
                         </h1>
                    <button className="btn btn-outline-danger" onClick={
                        () => {
                            history.push('/SignIn')
                            history.replace('/SignIn')
                        }
                    }>
                        Go to Sign In
                         </button>
                    <button className="btn btn-outline-success" onClick={
                        () => {
                            history.push('/SignUp')
                            history.replace('/SignUp')
                        }
                    }>
                        Go to Sign Up
                         </button>
                </div>
        }
        </div>

    )
}