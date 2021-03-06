export const initialState: stateType = {
  clients: [],
  tailors: ["fiazfaiza981@gmail.com"],
  measurment: [],
  orders: [],
  stitch: [],
  delivered: [],
  unStitch: [],
  lost: [],
  outOfOrder: [],
  customer: [],
};
type stateType = {
  tailors: any[];
  clients: any[];
  measurment: any[];
  orders: any[];
  stitch: any[];
  delivered: any[];
  unStitch: any[];
  lost: any[];
  outOfOrder: any[];
  customer: any[];
};

export default function TailorReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case "Add_Tailor":
      return {
        ...state,
        Tailors: (state.tailors[0] = action.tailor),
      };
    case "Delete_Tailor":
      return {
        ...state,
        tailors: (state.tailors = []),
        clients: (state.clients = []),
        measurment: (state.measurment = []),
        orders: (state.orders = []),
        stitch: (state.stitch = []),
        delivered: (state.delivered = []),
        unStitch: (state.unStitch = []),
        lost: (state.lost = []),
        outOfOrder: (state.outOfOrder = []),
        customer: (state.customer = []),
      };

    case "Add_Client":
      return {
        ...state,
        Clients: state.clients.push(action.customer),
      };
    case "Delete_Client":
      return {
        ...state,
        Clients: state.clients.splice(action.customerIndex, 1),
        Measurments: state.measurment.splice(action.measurmentIndex, 1),
        Orders: state.orders.splice(action.orderIndex, 1),
        Stitched: state.stitch.splice(action.stitchIndex, 1),
        Delivered: state.delivered.splice(action.deliveredIndex, 1),
        unStitch: state.unStitch.splice(action.unStitchIndex, 1),
        Losted: state.lost.splice(action.lostIndex, 1),
        OutOfOrders: state.outOfOrder.splice(action.outOfOrderIndex, 1),
        Customer: (state.customer = []),
      };
    case "Add_Measurment":
      return {
        ...state,
        Measurment: state.measurment.push([action.client, action.measurment]),
      };
    case "Update_Measurment":
      return {
        ...state,
        Measurment: (state.measurment[action.index][1] = action.measurment),
      };
    case "Add_Order":
      return {
        ...state,
        Orders: state.orders.push([action.client, action.orders]),
      };
    case "Update_Order":
      return {
        ...state,
        Orders: (state.orders[action.index][1] = action.orders),
      };
    case "Add_Stitch":
      return {
        ...state,
        Stitched: state.stitch.push([action.client, action.amount]),
      };
    case "Update_Stitch":
      return {
        ...state,
        Stitched: (state.stitch[action.index][1] = action.amount),
      };
    case "Add_Delivered":
      return {
        ...state,
        Delivered: state.delivered.push([action.client, action.amount]),
      };
    case "Update_Delivered":
      return {
        ...state,
        Delivered: (state.delivered[action.index][1] = action.amount),
      };
    case "Add_UnStitched":
      return {
        ...state,
        UnStitch: state.unStitch.push([action.client, action.amount]),
      };
    case "Update_UnStitched":
      return {
        ...state,
        UnStitch: (state.unStitch[action.index][1] = action.amount),
      };
    case "Add_Lost":
      return {
        ...state,
        Losted: state.lost.push([action.client, action.amount]),
      };
    case "Update_Lost":
      return {
        ...state,
        Losted: (state.lost[action.index][1] = action.amount),
      };
    case "Add_OutOfOrder":
      return {
        ...state,
        OutOfOrders: state.outOfOrder.push([action.client, action.amount]),
      };

    case "Update_OutOfOrder":
      return {
        ...state,
        OutOfOrders: (state.outOfOrder[action.index][1] = action.amount),
      };
    case "Add_Customer":
      return {
        ...state,
        Customer: (state.customer[0] = action.customer),
      };
    case "Delete_Customer":
      return {
        ...state,
        Customer: (state.customer = []),
      };
    default:
      return state;
  }
}
