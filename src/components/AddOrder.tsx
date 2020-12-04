import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useSelector } from 'react-redux';

export const AddOrder = (props: any) => {
    const customerState = useSelector((state: any) => state);
    return (<div>
        <h1 className="h1 text-muted">Orders</h1>
        <p className="text-muted">If you want to stitch new dress : </p>
        <input className="form-control" type="text" placeholder="Add number of orders here" />
        {customerState.orders.length > 0 ?
            customerState.orders.map((order: any[], index: number) => {
                if (order[0] === props.client) {
                    return (<p key={index}>Already Orders are {order[1]}</p>)
                }
            }) :
            null
        }
    </div>)
}