import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { history } from './index';
import { useDispatch } from 'react-redux';
import { addClient, deleteCustomer } from "./store";


export const Customers = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();

    return (
        <div>
            {
                customerState.clients.length > 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        return (<div key={index} className="mt-1  text-right mr-5">
                            <h3 className="h3 text-muted d-inline mt-2">{customer}</h3>
                            <button id={customer + "measurment"} className="btn btn-outline-success d-inline m-2 " onClick={() => {
                                dispatch(addClient(customer));
                                history.push("/Measurment");
                                history.replace("/Measurment");
                            }}>Measurment</button>
                            <button id={customer + "orders"} className="btn btn-outline-danger d-inline m-1" onClick={() => {
                                dispatch(addClient(customer));
                                history.push("/Orders");
                                history.replace("/Orders");
                            }}>Orders</button>
                            <button id={customer + "delete"} className="btn btn-outline-primary d-inline m-1 mr-5" onClick={() => {
                                dispatch(deleteCustomer(customer, customerState));
                            }}>Delete</button>
                        </div>)
                    }) :
                    null
            }
        </div>
    );
};
