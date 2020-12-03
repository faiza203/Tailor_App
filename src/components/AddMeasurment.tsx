import React, { Component } from 'react';
export class addMeasurment extends Component {
    render() {
        return (
            <form>
                <label className="h1 text-muted text-dark">Measurment</label>
                <input className="form-control" type="text" placeholder="Length" required />
                <input className="form-control mt-1" type="number" placeholder="Width" required />
                <input className="form-control mt-1" type="number" placeholder="Neck" required />
                <input className="form-control mt-1" type="number" placeholder="Waist" required />
                <input className="form-control mt-1" type="number" placeholder="Middle" required />
                <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required />
                <button id="saveMeasurment" className="btn btn-outline-primary" type="submit">Save Measurment</button>
            </form>
        )
    }
}