import React, { Component } from "react";
import firebase from "firebase";
import { v4 as uuid } from 'uuid';
import {history} from './index'
export const Customers = (props: any) => {
    let customers: any[] = [];
    let customersData: any[] = [123, 321, 231];
    {
        firebase
            .firestore()
            .collection("tailors")
            .doc(props.name)
            .collection("customers")
            .get()
            .then((querySnapshot: any) => {
                querySnapshot.forEach(function (doc: any) {
                    const customersData = doc.data().id;
                    customers.push(customersData)
                })
            })
            .catch((err: any) => {
                alert(err.message);
            });
    }
    const id = uuid();
    return (
        <div>
            <h2 className="h2 text-muted">Customers</h2>
            {customers.forEach((customer, i) => {
                <div>
                    <p key={i + customer} className="p text-muted">{customer}</p>
                    <button className="btn btn-outline-primary">Measurement</button>
                </div>;
            })}
            <div>
                <p className="p text-muted">{props.name}</p>
                <button className="btn btn-outline-primary" id={uuid() + "measBtn"} onClick={() => {
                    history.push("/addMeasurment")
                    history.replace("/addMeasurment")
                }}>Measurement</button>
            </div>

        </div>
    );
};
