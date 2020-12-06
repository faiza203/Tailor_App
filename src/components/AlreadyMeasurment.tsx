import React from 'react';
import { useSelector } from 'react-redux';
import { AddMeasurment } from './index';
import { addMeasurmentR } from './store';
export function AlreadyMeasurment(props: any) {
    const customerState = useSelector((state: any) => state);
    return (
        <div >
            <h1 className="h1 text-muted">Measurment</h1>
            <div id="Measurment">
            {customerState.measurment.length > 0 ?
                customerState.measurment.map((measurment: any[], index: number) => {
                    if (measurment[0] === props.client) {
                        console.log(measurment[1]);
                        
                        return (<div key={index}>
                            <p className="text-muted"> Length : {measurment[1].Length}</p>
                            <p className="text-muted"> Width : {measurment[1].Width}</p>
                            <p className="text-muted"> Neck : {measurment[1].Neck}</p>
                            <p className="text-muted"> Waist : {measurment[1].Waist}</p>
                            <p className="text-muted"> Middle : {measurment[1].Middle}</p>
                            <p className="text-muted"> Leg Lenght : {measurment[1].LegLenght}</p>
                        </div>)
                    }
                }) :
                null
            }
            <AddMeasurment />
            </div>
        </div>
    )
}
