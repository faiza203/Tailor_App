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
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Orders").doc(client).set({
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

export function checkStitch(client: any, amount: any, customerStateStitch: any, dispatch: any) {
    if (customerStateStitch.length > 0) {
        customerStateStitch.forEach((customer: any, index: number) => {
            if (client !== undefined && amount !== null) {
                if (customer[0] === client) {
                    dispatch(updateStitch(client, index, amount));
                }
            }
        })
    }
    else {
        dispatch(addStitch(client, amount))
    }
}

export function addStitch(client: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Sticthed").doc(client).set({
            sticthed: parseInt(amount)
        }).then().catch();
    });

    return {
        type: "Add_Stitch",
        client,
        amount
    }
}

export function updateStitch(client: any, index: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Sticthed").doc(client).set({
            sticthed: parseInt(amount)
        }).then().catch();
    });

    return {
        type: "Update_Stitch",
        index,
        amount
    }
}




export function checkDeliveredFirebase(client: any, amount: string, customerStateDelivered: any, dispatch: any) {
    const arr = [];
    if (customerStateDelivered.length > 0) {
        customerStateDelivered.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateDelivered.length) {
        checkDelivered(client, amount, customerStateDelivered, dispatch,)
    }
}

export function checkDelivered(client: any, orders: string, customerStateOrders: any, dispatch: any) {
    if (customerStateOrders.length > 0) {
        customerStateOrders.forEach((customer: any, index: number) => {
            if (client !== undefined && orders !== null) {
                if (customer[0] === client) {
                    dispatch(updateDelivered(client, index, orders));
                }
            }
        })
    }
    else {
        if (orders !== undefined) {
            dispatch(addDelivered(client, orders))
        }
    }
}

export function addDelivered(client: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Delivered").doc(client).set({
            delivered: parseInt(amount)
        }).then().catch();
    });

    return {
        type: "Add_Delivered",
        client,
        amount
    }
}

export function updateDelivered(client: any, index: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Delivered").doc(client).set({
            delivered: parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Update_Delivered",
        index,
        amount
    }
}

export function checkUnStitchFirebase(client: any, amount: string, customerStateUnStitch: any, dispatch: any) {
    const arr = [];
    if (customerStateUnStitch.length > 0) {
        customerStateUnStitch.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateUnStitch.length) {
        checkUnStitch(client, amount, customerStateUnStitch, dispatch,)
    }
}


export function checkUnStitch(client: any, amount: string, customerStateUnStitch: any, dispatch: any) {
    if (customerStateUnStitch.length > 0) {
        customerStateUnStitch.forEach((customer: any, index: number) => {
            if (client !== undefined && amount !== null) {
                if (customer[0] === client) {
                    dispatch(updateUnstitched(client, index, amount));
                }
            }
        })
    }
    else {
        if (amount !== undefined) {
            dispatch(addUnstitched(client, amount))
        }
    }
}

export function addUnstitched(client: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("UnStitched").doc(client).set({
            unstitched: parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Add_UnStitched",
        client,
        amount
    }
}

export function updateUnstitched(client: any, index: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("UnStitched").doc(client).set({
            unstitched : parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Update_UnStitched",
        index,
        amount
    }
}

