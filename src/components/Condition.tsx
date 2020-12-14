import { useSelector } from 'react-redux';

export const Condition = () => {
    const customerState = useSelector((state: any) => state);
    const client: any = customerState.customer[0];
    return (<div id="addCondition">

        {customerState.orders.length > 0 ?
            customerState.orders.map((order: any[], index: number) => {
                console.log(order[0] , client);
                console.log(customerState);
                
                if (order[0].toUpperCase() === client) {
                    return (
                        <div className="condition">
                            <h1 className="h1 text-muted">Condition</h1>
                            <p className="text-muted">If you want to add Condition : </p>
                            <input className="w-75 d-inline form-control" type="number" placeholder="Add stitched dress number" />
                            <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add develired dress number" />
                            <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add un stitched dress number" />
                            <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add lost dress number" />
                            <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add out of order stitched dress number" />
                        </div>
                    )
                }
            }) :
            null
        }

    </div>
    )
}
