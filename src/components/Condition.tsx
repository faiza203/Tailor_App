import { useSelector } from 'react-redux';

export const Condition = () => {
    const customerState = useSelector((state: any) => state);
    const client: any = customerState.customer[0];
    return (<div id=" Condition">
        {customerState.orders.length > 0 ?
            customerState.orders.map((order: any[], index: number) => {
                if (order[0].toUpperCase() === client) {
                    return (
                        <div className="condition ml-5" key={index}>
                            <h1 className="h1 text-muted">Condition</h1>
                            <p className="text-muted">If you want to  add   Condition : </p>
                            <input type="number" placeholder=" Stitched  " />
                            <input className=" mt-1 " type="number" placeholder=" Delivered  " />
                            <input className=" mt-1 " type="number" placeholder=" Un Stitched  " />
                            <input className=" mt-1 " type="number" placeholder=" Lost  " />
                            <input className=" mt-1 " type="number" placeholder=" Out of Order Stitched  " />
                        </div>
                    )
                }
            }) :
            null
        }

    </div>
    )
}
