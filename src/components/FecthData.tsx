import firebase from 'firebase';
import { addTailor } from './index';
export const fecthData = (dispatch: any) => {
    firebase.database().ref().on("child_added", snap => {
        const tailor = snap.val();
        dispatch(addTailor(tailor))
    })
}