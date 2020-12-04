import { createStore } from 'redux';
import TailorReducer from './reducer';
import { useDispatch } from 'react-redux'
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
        customer
    }
}
export function fecthCustomer(type: any) {
    return {
        type
    }
}
export function addMeasurmentR(client: any, measurment: number[]) {
    return {
        type: "Add_Measurment",
        client,
        measurment
    }
}


export function addOrder(client: any, orders: number) {
    return {
        type: "Add_Order",
        client,
        orders
    }
}
export function updateOrder(client: any, orders: number, index : any,customerStateValue: any) {
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
                dispatch(updateOrder(client, orders, index , customerStateValue));    
            }
        })
    } else {
        dispatch(addOrder(client, orders))
    }
}
