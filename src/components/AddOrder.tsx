import React from 'react';
import { useSelector } from 'react-redux';

export const AddOrder = () => {
    const customerState = useSelector((state: any) => state);
    return (<div>
        <h1 className="h1 text-muted">Orders</h1>
        <p className="text-muted">If you want to stitch new dress : </p>
        <input className="form-control" type="text" placeholder="Add number of orders here" />
        {customerState.orders.lenght > 0 ?
            <p>{customerState.orders.lenght}</p> :
            null
        }
    </div>)
}