export const initialState: stateType = {
    clients: [],
    tailors: [],
    measurment : [],
}
type stateType = {
    tailors: any[],
    clients: any[],
    measurment : any[]
}

export default function TailorReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case "Add_Talior":
            return {
                ...state,
                tailors: state.tailors.push(action.tailor)
            }
        case "Add_Customer":
            return {
                ...state,
                clients: state.clients.push(action.customer)
            }
        case "Fecth_Customer":
            return {
                ...state,
                state
            }
        case "Add_Measurment": 
        return {
            ...state ,
            clientMeasurment : state.measurment.push(action.client + "," + action.measurment),
        }
        default:
            return state
    }
}

