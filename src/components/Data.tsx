import React, { Component } from 'react';
import firebase from 'firebase';
import {v4 as uuid} from 'uuid';

export const getFromFirebase = (tailor : any) => {
    const firestore = firebase.firestore();
    firestore
        .collection("tailors")
        .doc(tailor)
        .collection('customers')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function (doc) {
                const constumersData = doc.data();
            });
        })
        .catch((err) => {
            alert(err.message)
        })
}

export const addCustomer = (e : any) => {
    e.preventDefault();
    const customer : String = e.target[0].value ;
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();  
        const id = uuid();
        const promise = firebase.firestore().collection('tailors').doc(tailor).collection('customers').doc(uuid()).set({
            id : customer
        })
        .then(() =>{
           alert("customer is added")
        })
            .catch((err) => {
                alert(err.message)
            })
    });
}


export class addMeasurment extends Component {
           render(){
               return (
                   <form onClick={saveMeasurment}>
                       <label className="text-dark">Measurment</label>
                       <input className="form-control" type="text" placeholder="Length" required/>
                       <input className="form-control mt-1" type="number" placeholder="Width" required/>
                       <input className="form-control mt-1" type="number" placeholder="Neck" required/>
                       <input className="form-control mt-1" type="number" placeholder="Waist" required/>
                       <input className="form-control mt-1" type="number" placeholder="Middle" required/>
                       <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required/>
                       <button id="saveMeasurment" type="submit"></button>
                   </form>
               )
           }
}