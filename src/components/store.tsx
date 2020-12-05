import { createStore } from 'redux';
import TailorReducer from './reducer';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase';
export const store = createStore(TailorReducer);
export function addTailor(tailor: any) {
    return {
        type: "Add_Tailor",
        tailor
    }
}
export function addCustomerR(customer: any) {
    return {
        type: "Add_Customer",
        customer,
    }
}


export function addMeasurmentR(client: any, measurment: measurment) {
    return {
        type: "Add_Measurment",
        client,
        measurment
    }
}
type measurment = {
    Length: number, Width: number, Neck: number, Waist: number, Middle: number, LegLenght: number,

}

export function addOrder(client: any, orders: number) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('clients').doc(tailor).collection('customers').doc(client).set({
            orders: orders
        }).then().catch();
    });
    return {
        type: "Add_Order",
        client,
        orders
    }
}
export function updateOrder(client: any, orders: number, index: any, customerStateValue: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('clients').doc(tailor).collection('customers').doc(client).set({
            orders: parseInt(customerStateValue[1]) + orders
        }).then().catch();
    });


    return {
        type: "Update_Order",
        client,
        orders,
        customerStateValue,
        index
    }
}
export function checkOrder(client: any, orders: number, customerStateOrders: any, dispatch: any) {
    if (customerStateOrders.length > 0) {
        customerStateOrders.forEach((customer: any, index: number) => {
            if (customer[0] === client) {
                const customerStateValue = customerStateOrders[index];
                dispatch(updateOrder(client, orders, index, customerStateValue));
            }
        })
    } else {
        dispatch(addOrder(client, orders))
    }
}

export const checkCustomer = (client: any, customerStateClient: any, dispatch: any) => {
    if (customerStateClient.length > 0) {
        customerStateClient.forEach((customer: any, index: number) => {
            if (customer === client) {
                alert("You have already this user")
            } else {
                dispatch(addCustomerR(client));
                firebase.database().ref().on("child_added", snap => {
                    const tailor = snap.val();
                    const id = uuid();
                    const promise = firebase.firestore().collection('Tailor App').doc('tailor').collection(tailor).doc(id).set({
                        id: customer
                    });
                    promise.then(() => {
                        alert("customer is added");
                    })
                    promise.catch((err) => {
                        alert(err.message)
                    })
                });
            }
        })
    } else {
        dispatch(addCustomerR(client))
    }
}