import React from 'react';
import {useSelector} from 'react-redux';
export function AddMeasurment(props : any) {
    const customerState = useSelector((state: any) => state);
    return (
        <div>
            <label className="h1 text-muted text-dark">Measurment</label>
            <input className="form-control" type="text" placeholder="Length" required />
            <input className="form-control mt-1" type="number" placeholder="Width" required />
            <input className="form-control mt-1" type="number" placeholder="Neck" required />
            <input className="form-control mt-1" type="number" placeholder="Waist" required />
            <input className="form-control mt-1" type="number" placeholder="Middle" required />
            <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required />
           
            {customerState.measurment.length > 0 ?
            customerState.measurment.map((measurment: any[], index: number) => {
                if (measurment[0] === props.client) {
                    return (<div key={index}><h1>Already Measurment  {measurment[0]}</h1></div>)
                }
            }) :
            null
        }
   
        </div>
    )
}
