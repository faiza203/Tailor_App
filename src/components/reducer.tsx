export const initialState: stateType = {
    clients: [],
    tailors: [],
    measurment: [],
    orders: [],
    stitch: [],
    delivered: [],
}
type stateType = {
    tailors: any[],
    clients: any[],
    measurment: any[],
    orders: any[],
    stitch: any[],
    delivered: [],
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
        case "Fecth_Customer":
            return {
                ...state,
                ClientsFirebase: state.clients.push(action.client)
            }
        case "Add_Measurment":
            return {
                ...state,
                Measurment: state.measurment.push([action.client, action.measurment]),
            }
        case "Update_Measurment":
            return {
                ...state,
                Measurment: state.measurment[action.index][1] = (action.measurment),
            }
        case "Add_Order":
            return {
                ...state,
                Orders: state.orders.push([action.client, action.orders]),
            }
        case "Update_Order":
            return {
                ...state,
                Orders: state.orders[action.index][1] = (action.orders)
            }
        case "Add_Stitch":
            return {
                ...state,
                Stitched: state.stitch.push([action.client, action.amount]),
            }
        case "Update_Stitch":
            return {
                ...state,
                Stitched: state.stitch[action.index][1] = (action.amount),
            }
        case "Add_Delivered":
            return {
                ...state,
                Delivered: state.delivered.push([action.client, action.amount]),
            }
        case "Update_Delivered":
            return {
                ...state,
                Delivered: state.delivered[action.index][1] = action.amount,
            }
        default:
            return state
    }
}

