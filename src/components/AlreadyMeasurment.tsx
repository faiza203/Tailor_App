import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkMeasurment, checkFirebaseMeasurment , deleteClient , history} from './index';
import firebase from 'firebase';

export function AlreadyMeasurment(props: any) {
    const customerState = useSelector((state: any) => state);
    const tailor: any = customerState.tailors[0];
    const client: any = customerState.customer[0];
    const dispatch = useDispatch();
    const promise = () => {
        firebase.firestore().collection('Measurments').doc(tailor).collection("Customer").get()
            .then(snapshot => {
                snapshot.docs.forEach(client => {
                    const clientName = client.id;
                    const measurment = client.data().measurmentEle;
                    checkFirebaseMeasurment(clientName, measurment, dispatch, customerState.measurment);
                })
            }).catch()
    }
    promise();
    const saveMeasurment: any = (e: any) => {
        e.preventDefault();

        const [Length, Width, Neck, Chest, Waist, Bust, ArmLenght, ShoulderLenght, LegLenght] = e.target;
        const measurmentEle = {
            Length: Length.value, Width: Width.value, Chest: Chest.value, Bust: Bust.value, Waist: Waist.value, Neck: Neck.value, ArmLenght: ArmLenght.value, Shoulder: ShoulderLenght.value, LegLenght: LegLenght.value,
        }

        firebase.database().ref().on("child_added", snap => {
            const promise = firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").doc(client).set({
                measurmentEle
            });
            promise.then(() => {
                alert("Data is updated");
                checkMeasurment(client, measurmentEle, dispatch, customerState.measurment);
                history.push("/DashBoard");
                history.replace("/DashBoard");
                dispatch(deleteClient());
            })
            promise.catch((err) => {
                alert(err.message);
                dispatch(deleteClient());
            })
        });
    }

    return (
        <div >
            {customerState.tailors.length > 0 ?
                customerState.measurment.map((measurment: any, index: number) => {
                    if (measurment[0] === client) {
                        return (<div key={index} className="mr-5">
                            <ul key={index} className="measurment">
                                <li className="text-muted"> Length : {measurment[1].Length}</li>
                                <li className="text-muted"> Width : {measurment[1].Width}</li>
                                <li className="text-muted"> Neck : {measurment[1].Neck}</li>
                                <li className="text-muted"> Waist : {measurment[1].Waist}</li>
                                <li className="text-muted"> Bust : {measurment[1].Bust}</li>
                                <li className="text-muted"> Chest : {measurment[1].Chest}</li>
                                <li className="text-muted"> Arm Lenght : {measurment[1].ArmLenght}</li>
                                <li className="text-muted"> Shoulder Length : {measurment[1].Shoulder}</li>
                                <li className="text-muted"> Leg Lenght : {measurment[1].LegLenght}</li>
                            </ul>
                            <button className="btn btn-outline-danger" onClick={() => {
                                history.push('/EditMeasurment')
                                history.replace('/EditMeasurment');
                            }} >Edit</button>
                            <button className="btn btn-outline-success" onClick={() => {
                                history.push('/Dashboard')
                                history.replace('/Dashboard');
                                dispatch(deleteClient());
                            }}
                            >Cancle</button>
                        </div>)
                    }
                }) :
                <div>
                    <h1 className="h1 font-italic text-muted">
                        Please login first
                 </h1>
                    <button className="btn btn-outline-danger" onClick={
                        () => {
                            history.push('/SignIn')
                            history.replace('/SignIn')
                        }
                    }>
                        Go to Sign In
                 </button>
                    <button className="btn btn-outline-success" onClick={
                        () => {
                            history.push('/SignUp')
                            history.replace('/SignUp')
                        }
                    }>
                        Go to Sign Up
                 </button>
                </div>
            }
        </div>
    )
}