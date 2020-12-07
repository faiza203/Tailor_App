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
    let arr = [];
    if (customerStateClient.length > 0) {
        customerStateClient.forEach((customer: any) => {
            if (customer !== client) {
                arr.push("yes");
            }
        })
    }
    if (arr.length === customerStateClient.length) {
        dispatch(addCustomerR(client))
    }
    else {
        alert("You have already this user")
    }
}

export function addCustomerR(customer: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('Tailor App').doc('Tailor').collection(tailor).doc(uuid()).set({
            id: customer
        });
        promise.then(() => {
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


export function checkCustomerFirebase(client: any, customerStateClient: any, dispatch: any) {
    let arr = [];
    if (customerStateClient.length > 0) {
        customerStateClient.forEach((customer: any) => {
            if (customer !== client) {
                arr.push("yes");
            }
        })
    }
    if (arr.length === customerStateClient.length) {
        dispatch(addFirebaseCustomer(client))
    }
}

export function addFirebaseCustomer(client: any) {
    return {
        type: "Fecth_Customer",
        client
    }
}

export const checkMeasurment = (client: any, measurment: any, dispatch: any, customerStateMeasurment: any) => {
    if (client !== undefined) {
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
}

export const checkFirebaseMeasurment = (client: any, measurment: any, dispatch: any, customerStateMeasurment: any) => {
    const arr = [];
    if (customerStateMeasurment.length > 0) {
        customerStateMeasurment.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateMeasurment.length) {
        checkMeasurment(client, measurment, dispatch, customerStateMeasurment)
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

export function checkOrderFirebase(client: any, orders: string, customerStateOrders: any, dispatch: any) {
    const arr = [];
    if (customerStateOrders.length > 0) {
        customerStateOrders.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateOrders.length) {
        checkOrder(client, orders, customerStateOrders, dispatch,)
    }
}

export function checkOrder(client: any, orders: string, customerStateOrders: any, dispatch: any) {
    if (customerStateOrders.length > 0) {
        customerStateOrders.forEach((customer: any, index: number) => {
            if (client !== undefined && orders !== null) {
                if (customer[0] === client) {
                    const order: number = parseInt(customer[1]) + parseInt(orders);
                    dispatch(updateOrder(client, index, order));
                }
            }
        })
    }
    else {
        if (orders !== undefined) {
            dispatch(addOrder(client, orders))
        }
    }
}
export function addOrder(client: any, orders: string) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Orders").doc(client).set({
            orders: parseInt(orders)
        }).then().catch();
    });
    const order = parseInt(orders)
    return {
        type: "Add_Order",
        client,
        orders: order
    }
}

export function updateOrder(client: any, index: any, orders: number) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        const promise = firebase.firestore().collection('Tailor App').doc(tailor).collection("Orders").doc(client).set({
            orders: orders
        }).then().catch();
    });
    return {
        type: "Update_Order",
        client,
        orders,
        index
    }
}



export function checkCondition(client: any, conditionType: any, conditionAmount: any, customerStateCondition: any, dispatch: any) {
    if (customerStateCondition.length > 0) {
        customerStateCondition.forEach((customer: any, index: number) => {
            if (customer[0] === client) {
                dispatch(updateCondition(client, conditionType, conditionAmount, customerStateCondition))
            }

        })
    }
    else {
        dispatch(addCondition(client, conditionType, conditionAmount))
    }
}
export function addCondition(client: any, conditionType: any, conditionAmount: any) {
    const condition = {
        conditionType, conditionAmount
    }
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Condition").doc(client).set({
            condition
        }).then().catch();
    });
    
    return {
        type: "Add_Condition",
        client,
        conditionType,
        conditionAmount
    }
}

export function updateCondition(client: any, conditionType: any, conditionAmount: any, customerStateCondition: any) {
    // firebase.database().ref().on("child_added", snap => {
    //     const tailor = snap.val();
    //     firebase.firestore().collection('Tailor App').doc(tailor).collection("Condition").doc(client).set({
    //         condition: [conditionType, conditionAmount]
    //     }).then().catch();
    // });

}