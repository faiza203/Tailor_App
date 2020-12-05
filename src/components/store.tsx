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

export const checkCustomer = (client: any, customerStateClient: any, dispatch: any) => {
    if (customerStateClient.length > 0) {
        customerStateClient.forEach((customer: any, index: number) => {
            if (customer === client) {
                alert("You have already this user")
            } else {
                dispatch(addCustomerR(client));
            }
        })
    } else {
        dispatch(addCustomerR(client))
    }
}


export function addCustomerR(customer: any) {
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
    return {
        type: "Add_Customer",
        customer,
    }
}

export const checkMeasurment = (client: any, measurment: any, dispatch: any, customerStateMeasurment: any) => {
    if (customerStateMeasurment.length > 0) {
        customerStateMeasurment.forEach((customer: any, index: number) => {
            if (customer[0] === client) {
                dispatch(updateMeasurmentR(client, measurment, index))
            } else {
                dispatch(addMeasurmentR(client, measurment));
            }
        })
    } else {
        dispatch(addMeasurmentR(client, measurment))
    }
}


export function addMeasurmentR(client: any, measurment: measurment) {
    return {
        type: "Add_Measurment",
        client,
        measurment
    }
}
export function updateMeasurmentR(client: any, measurment: measurment, index: number) {
    return {
        type: "Update_Measurment",
        client,
        index,
        measurment
    }
}

type measurment = {
    Length: number, Width: number, Neck: number, Waist: number, Middle: number, LegLenght: number,

}

export function addOrder(client: any, orders: number) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('Tailor App').doc('clients').collection(tailor).doc(client).set({
            orders: orders
        }).then().catch();
    });
    return {
        type: "Add_Order",
        client,
        orders
    }
}
export function checkOrder(client: any, orders: string, customerStateOrders: any, dispatch: any) {
    if (customerStateOrders.length > 0) {
        customerStateOrders.forEach((customer: any, index: number) => {
            if (customer[0] === client) {
                const order : number = parseInt(customer[1]) + parseInt(orders);
                dispatch(updateOrder(client,  index, order));
            }
        })
    } else {
        dispatch(addOrder(client, parseInt(orders)))
    }
}

export function updateOrder(client: any,  index: any, order: number) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('Tailor App').doc("Clients").collection(tailor).doc(client + " Orders").set({
            orders : order
        }).then().catch();
    });
    return {
        type: "Update_Order",
        client,
        orders: order,
        index
    }
}

