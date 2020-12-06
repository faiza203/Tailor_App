import React from 'react';
import { useSelector } from 'react-redux';
import { AddMeasurment } from './index';
export function AlreadyMeasurment(props: any) {
    const customerState = useSelector((state: any) => state);
    return (
        <div >
            <h1 className="h1 text-muted">Measurment</h1>
            <div id="Measurment">
                {customerState.measurment.length > 0 ?
                    customerState.measurment.map((measurment: any[], index: number) => {
                        if (measurment[0] === props.client) {
                            return (<ul key={index} className="mr-5">
                                <li className="text-muted"> Length : {measurment[1].Length}</li>
                                <li className="text-muted"> Width : {measurment[1].Width}</li>
                                <li className="text-muted"> Neck : {measurment[1].Neck}</li>
                                <li className="text-muted"> Waist : {measurment[1].Waist}</li>
                                <li className="text-muted"> Middle : {measurment[1].Middle}</li>
                                <li className="text-muted"> Leg Lenght : {measurment[1].LegLenght}</li>
                            </ul>)
                     }
                     }) :
                    null
                }
                <AddMeasurment/>
            </div>
        </div>
    )
}
