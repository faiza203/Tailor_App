export const initialState: stateType = {
    clients: [],
    tailors : [],
}
type stateType = {
    tailors : string[],
    clients: string[],
}
export default function TailorReducer(state : any = initialState , action : any ) {
    switch (action.type) {
        case "Add_Talior":
            return {
                ...state,
                tailors: state.tailors.push(action.tailor)
            }
        case "Add_Customer":
            return {
                ...state ,
                clients :action.clients.push(action.customer)
            }
        default:
            return state
    }
}

