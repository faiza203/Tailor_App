export const initialState: stateType = {
    clients: [],
    tailors: [],
    measurment: [],
    orders: [],
}
type stateType = {
    tailors: any[],
    clients: any[],
    measurment: any[],
    orders: any[],
}

export default function TailorReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case "Add_Tailor":
            return {
                ...state,
                Tailors: state.tailors.push(action.tailor)
            }
        case "Add_Customer":
            return {
                ...state,
                Clients: state.clients.push(action.customer)
            }
        case "Add_Measurment":
            return {
                ...state,
                Measurment: state.measurment.push([action.client, action.measurment]),
            }
        case "Add_Order":
            return {
                ...state,
                clientOrder: state.orders.push([action.client, parseInt(action.orders)]),
            }
        case "Update_Order":
            return {
                ...state,
                Orders: state.orders[action.index][1] = (action.orders)
            }
        case "Update_Measurment":
            return {
                ...state,
                Measurment: state.measurment[action.index][1] = (action.measurment),
            }
        default:
            return state
    }
}

