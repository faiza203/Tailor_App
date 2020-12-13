import React from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { checkFirebaseMeasurment, checkMeasurment } from './index';
import { history } from './history';
import { AlreadyMeasurment } from './AlreadyMeasurment';
export function Measurment() {
    const client: any = localStorage.getItem("customer");
    const tailor: any = localStorage.getItem("tailor");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").get()
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
            Length: Length.value, Width: Width.value, Chest: Chest.value, Waist: Waist.value, Neck: Neck.value, ArmLenght: ArmLenght.value, Shoulder: ShoulderLenght.value, LegLenght: LegLenght.value,
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
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }

    let arr = [];
    return (
        <div>
            <h1 className="h1 text-muted">Measurment</h1>
            {customerState.measurment.length > 0 ?
                customerState.measurment.map((measurment: any[], index: number) => {
                    if (measurment[0] === client) {
                        return (<AlreadyMeasurment client={client} />)
                    } else { arr.push("yes") }
                })
                : <AddMeasurment />
            }
            { customerState.measurment.length > 0 ?
                arr.length === customerState.measurment.length ?
                    <AddMeasurment />
                    : null
                : null
            }

        </div>
    )
}



export const AddMeasurment = () => {
    const client: any = localStorage.getItem("customer");
    const tailor: any = localStorage.getItem("tailor");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const promise = () => {
        firebase.firestore().collection('Tailor App').doc(tailor).collection("Measurment").get()
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

        const [Length, Width, Neck, Chest, Waist, Bust, ArmLenght, ShoulderLenght, LegLenght, Hip] = e.target;
        const measurmentEle = {
            Length: Length.value, Width: Width.value, Chest: Chest.value, Bust: Bust.value, Waist: Waist.value, Neck: Neck.value, ArmLenght: ArmLenght.value, Shoulder: ShoulderLenght.value, LegLenght: LegLenght.value, Hip: Hip.value,
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
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }

    return (<div>
        <div className="measurment">
            <form className="mr-5 " onSubmit={saveMeasurment}>
                <input className="form-control" type="number" placeholder="Length" required />
                <input className="form-control mt-1" type="number" placeholder="Width" required />
                <input className="form-control mt-1" type="number" placeholder="Neck" required />
                <input className="form-control mt-1" type="number" placeholder="Chest" required />
                <input className="form-control mt-1" type="number" placeholder="Waist" required />
                <input className="form-control mt-1" type="number" placeholder="Bust" required />
                <input className="form-control mt-1" type="number" placeholder="Arm Width" required />
                <input className="form-control mt-1" type="number" placeholder="Shoulder Width" required />
                <input className="form-control mt-1" type="number" placeholder="Shoulder Width" required />
                <input className="form-control mt-1" type="number" placeholder="Hip" required />
                <button className="btn btn-outline-success d-inline" type="submit">Save Measurment</button>
                <button className="btn btn-outline-danger" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Cancle</button>
            </form>
        </div>
    </div>
    )
}
