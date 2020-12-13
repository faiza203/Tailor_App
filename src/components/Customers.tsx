import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { history } from './index';
import { useDispatch } from 'react-redux';
import { checkCustomerFirebase } from "./store";


export const Customers = (props: any) => {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Tailors').doc(props.name).collection('Customers').get()
            .then(snapshot => {
                snapshot.docs.forEach(clients => {
                    const client = snapshot.docs[0].id;
                    checkCustomerFirebase(client, customerState, dispatch)
                })
            }).catch()
    }
    promise();
    return (
        <div>
            {
                customerState.clients.length > 0 ?
                    customerState.clients.map((customer: any, index: number) => {
                        return (<div key={index} className="mt-1">
                            <h3 className="h3 text-muted d-inline mt-2">{customer}</h3>
                            <button id={customer + "measurment"} className="btn btn-outline-success d-inline m-2" onClick={() => {
                                localStorage.setItem("customer", customer)
                                history.push("/Measurment");
                                history.replace("/Measurment");
                            }}>Measurment</button>
                            <button id={customer + "orders"} className="btn btn-outline-danger d-inline m-1" onClick={() => {
                                localStorage.setItem("customer", customer);
                                history.push("/Orders");
                                history.replace("/Orders");
                            }}>Orders</button>
                        </div>)
                    }) :
                    null
            }
        </div>
    );
};
