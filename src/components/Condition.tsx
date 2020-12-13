import { useSelector} from 'react-redux';

export const Condition = (props: any) => {
    const customerState = useSelector((state: any) => state);
    return (<div id="addCondition">
        {
            customerState.orders.length > 0 ?
                <div className="condition">
                    <h1 className="h1 text-muted">Condition</h1>
                    <p className="text-muted">If you want to add Condition : </p>
                    <input className="w-75 d-inline form-control" type="number" placeholder="Add stitched dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add develired dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add un stitched dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add lost dress number" />
                    <input className="w-75 d-inline mt-1 form-control" type="number" placeholder="Add out of order stitched dress number" />
                </div> :
                null
        }
    </div>
    )
}
