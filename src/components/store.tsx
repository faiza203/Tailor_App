import { createStore } from 'redux';
import TailorReducer from './reducer';
import firebase from 'firebase';
export const store = createStore(TailorReducer);
export function addTailor(tailor: any) {
    return {
        type: "Add_Tailor",
        tailor
    }
}

export const checkCustomer = (client: any, customerState: any, dispatch: any) => {
    let arr = [];
    if (client.trim() === "") {
        alert("Please add a value")
    } else {
        if (customerState.clients.length > 0) {
            customerState.clients.forEach((customer: any) => {
                if (customer !== client) {
                    arr.push("yes");
                }
            })
        }
        if (arr.length === customerState.clients.length) {
            dispatch(addCustomerR(client, customerState.tailors[0]))
        }
        else {
            alert("You have already this user")
        }
    }
}

export function addCustomerR(customer: any, tailor: any) {
    const promise = firebase.firestore().collection('Tailors').doc(tailor).collection('Customers').doc(customer).set({
        measurmentId: customer + " MEASURMENT"
    })
    promise.then(() => {
    })
    promise.catch((err) => {
        alert(err.message)
    })
    return {
        type: "Add_Client",
        customer,
    }
}


export function checkCustomerFirebase(client: any, customerState: any, dispatch: any) {
    const arr = [];
    if (customerState.clients.length > 0) {
        customerState.clients.forEach((customer: any) => {
            if (customer !== client) {
                arr.push("yes");
            }
        })
    }
    if (arr.length === customerState.clients.length) {
        checkCustomer(client, customerState, dispatch);
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

export function checkOrderFirebase(client: any, orders: string, customerState: any, dispatch: any) {
    const arr = [];
    if (customerState.orders.length > 0) {
        customerState.orders.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerState.orders.length) {
        checkOrder(client, orders, customerState, dispatch,)
    }
}

export function checkOrder(client: any, orders: string, customerState: any, dispatch: any) {
    if (customerState.orders.length > 0) {
        customerState.orders.forEach((customer: any, index: number) => {
            if (client !== undefined && orders !== null) {
                if (customer[0] === client) {
                    const order: number = parseInt(customer[1]) + parseInt(orders);
                    dispatch(updateOrder(client, index, order, customerState.tailors[0]));
                }else{
                    dispatch(addOrder(client , orders , customerState.tailors[0]))
                }
            }
        })
    }
    else {
        if (orders !== undefined) {
            dispatch(addOrder(client, orders, customerState.tailors[0]))
        }
    }
}
export function addOrder(client: any, orders: string, tailor: string) {
    firebase.firestore().collection('Orders').doc(tailor).collection("Customer").doc(client).set({
        orders: parseInt(orders)
    }).then().catch();
    const order = parseInt(orders)
    return {
        type: "Add_Order",
        client,
        orders: order
    }
}
export function updateOrder(client: any, index: any, orders: number, tailor: any) {
    firebase.firestore().collection('Orders').doc(tailor).collection("Customer").doc(client).set({
        orders: orders
    }).then().catch();
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
            unstitched: parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Update_UnStitched",
        index,
        amount
    }
}


export function checkLostFirebase(tailor: any, client: any, amount: string, customerStateLost: any, dispatch: any) {
    const arr = [];
    if (customerStateLost.length > 0) {
        customerStateLost.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateLost.length) {
        checkLost(tailor, client, amount, customerStateLost, dispatch,)
    }
}


export function checkLost(tailor: any, client: any, amount: string, customerStateLost: any, dispatch: any) {
    if (customerStateLost.length > 0) {
        customerStateLost.forEach((customer: any, index: number) => {
            if (client !== undefined && amount !== null) {
                if (customer[0] === client) {
                    dispatch(updateLost(tailor, client, index, amount));
                }
            }
        })
    }
    else {
        if (amount !== undefined && client !== undefined) {
            dispatch(addLost(tailor, client, amount))
        }
    }
}

export function addLost(tailor: any, client: any, amount: string) {

    firebase.firestore().collection('Tailor App').doc(tailor).collection("Losted").doc(client).set({
        losted: amount
    }).then().catch();
    return {
        type: "Add_Lost",
        client,
        amount
    }
}

export function updateLost(tailor: any, client: any, index: any, amount: any) {
    firebase.firestore().collection('Tailor App').doc(tailor).collection("Losted").doc(client).set({
        losted: amount
    }).then().catch();
    return {
        type: "Update_Lost",
        index,
        amount
    }
}

export function checkOutOfOrderFirebase(tailor: any, client: any, amount: string, customerStateOutOfOrder: any, dispatch: any) {
    const arr = [];
    if (customerStateOutOfOrder.length > 0) {
        customerStateOutOfOrder.forEach((customer: any, index: number) => {
            if (client !== undefined) {
                if (customer[0] !== client) {
                    arr.push("yes");
                }
            }
        })
    }
    if (arr.length === customerStateOutOfOrder.length) {
        checkLost(tailor, client, amount, customerStateOutOfOrder, dispatch,)
    }
}

export const deleteCustomer = (client: any, state: any) => {
    let customerIndex;
    state.clients.forEach((customer: any, index: number) => {
        if (client === customer) {
            customerIndex = index;
            deleteFromFirebase(client, state)
        }
    })
    return {
        type: "Delete_Client",
        customerIndex
    }

}

export const deleteFromFirebase = (customer: any, state: any) => {
    firebase.firestore().collection('Tailors').doc(state.tailors[0]).collection('Customers').doc(customer).
        delete();
}

export function checkOutOfOrder(tailor: any, client: any, amount: string, customerStateOutOfOrder: any, dispatch: any) {
    if (customerStateOutOfOrder.length > 0) {
        customerStateOutOfOrder.forEach((customer: any, index: number) => {
            if (client !== undefined && amount !== null) {
                if (customer[0] === client) {
                    dispatch(updateOutOfOrder(client, index, amount));

                }
            }
        })
    }
    else {
        if (amount !== undefined && client !== undefined) {
            dispatch(addOutOfOrder(client, amount))
        }
    }
}

export function addOutOfOrder(client: any, amount: string) {

    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("OutOfOrder").doc(client).set({
            OutOfOrder: parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Add_OutOfOrder",
        client,
        amount
    }
}
export function updateOutOfOrder(client: any, index: any, amount: any) {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        firebase.firestore().collection('Tailor App').doc(tailor).collection("OutOfOrder").doc(client).set({
            OutOfOrder: parseInt(amount)
        }).then().catch();
    });
    return {
        type: "Update_OutOfOrder",
        index: index,
        amount
    }
}

export const addClient = (customer: any) => {
    console.log("I am added" , customer);
        return {
        type: "Add_Customer",
        customer
    }
}

export const deleteClient = () => {
    console.log("I am delete");
    return {
        type: "Delete_Customer",
    }
}