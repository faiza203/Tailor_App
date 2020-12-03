export const initialState: stateType = {
    clients: [],
    tailors: [],
}
type stateType = {
    tailors: any[],
    clients: any[],
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
                ...state
            }
        default:
            return state
    }
}

