import firebase from 'firebase';
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

