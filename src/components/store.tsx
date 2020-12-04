import { createStore } from 'redux';
import TailorReducer from './reducer';
import { useDispatch} from 'react-redux'
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


export function addOrder(client: any, orders : number) {
    return {
        type: "Add_Order",
        client,
        orders
    }
}
export function updateOrder (client : any, orders : any , customerStateValue : any){
    return {
        type : "Update_Order",
        client,
        orders,
        customerStateValue
    }
}
export function checkOrder(client: any, orders : number , customerState: any , dispatch : any) {
    if(customerState.orders.lenght > 0 ){
        customerState.orders.forEach((customer: any , index : number) => {
               if( customerState.orders[index][0] === customer ){
                const clientNu = customer.orders[index];
                dispatch(updateOrder(client , orders , clientNu))
               }
        })
    }else{
             dispatch(addOrder(client , orders))
    }
}
