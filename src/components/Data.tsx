import React from 'react';
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
    const id = uuid();
    e.preventDefault();
    const customer : String = e.target[0].value ;
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();  
        const firestore = firebase.firestore();
        firestore
            .collection("tailors")
            .doc(tailor)
            .collection("customers")
            .doc()
            .update({
                id : customer
             } )
            .catch((err) => {
                alert(err.message)
            })
    });
}
