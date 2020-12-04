import React from 'react';
import { addMeasurmentR } from './index';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

export function AddMeasurment() {
    return (
        <div>
            <label className="h1 text-muted text-dark">Measurment</label>
            <input className="form-control" type="text" placeholder="Length" required />
            <input className="form-control mt-1" type="number" placeholder="Width" required />
            <input className="form-control mt-1" type="number" placeholder="Neck" required />
            <input className="form-control mt-1" type="number" placeholder="Waist" required />
            <input className="form-control mt-1" type="number" placeholder="Middle" required />
            <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required />
        </div>
    )
}
