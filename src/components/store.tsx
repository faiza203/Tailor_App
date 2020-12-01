import { createStore } from 'redux';
import TailorReducer from './reducer';
export const store = createStore(TailorReducer);
export function addTailor (tailor : any){
    return {
        type: "Add_Tailor",
        tailor
}
}
export function addCustomerR (customer : any){
    return {
        type: "Add_Tailor",
        customer
}
}