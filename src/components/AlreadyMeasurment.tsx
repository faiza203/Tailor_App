import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkMeasurment, checkFirebaseMeasurment } from './index';
import firebase from 'firebase';
import { history } from './index';
import { isAnyOf } from '@reduxjs/toolkit';

export function AlreadyMeasurment(props: any) {
    const tailor: any = localStorage.getItem("tailor");
    const client: any = localStorage.getItem("customer");
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
            })
            promise.catch((err) => {
                alert(err.message)
            })
        });
    }

    return (
        <div >
            {customerState.measurment.length > 0 ?
                customerState.measurment.map((measurment: any[], index: number) => {
                    if (measurment[0] === props.client) {
                        const handleChange = (event: any) => {
                            console.log(event.target.value);
                        };


                        return (<div key={index} className="mr-5">
                            <div  key={index} id="editM" className="d-none">   <div className="measurment">
                                <form className="mr-5 " onSubmit={saveMeasurment}>
                                    <input className="form-control" type="number" id="form1" placeholder="Length" value={measurment[1].Length} onChange={handleChange} required />
                                    <input className="form-control mt-1" type="number" placeholder="Width" value={measurment[1].Width} required />
                                    <input className="form-control mt-1" type="number" placeholder="Neck" value={measurment[1].Neck} required />
                                    <input className="form-control mt-1" type="number" placeholder="Chest" value={measurment[1].Chest} required />
                                    <input className="form-control mt-1" type="number" placeholder="Waist" value={measurment[1].Waist} required />
                                    <input className="form-control mt-1" type="number" placeholder="Bust" value={measurment[1].Bust} required />
                                    <input className="form-control mt-1" type="number" placeholder="Arm Width" value={measurment[1].ArmLenght} required />
                                    <input className="form-control mt-1" type="number" placeholder="Shoulder Width" value={measurment[1].Shoulder} required />
                                    <input className="form-control mt-1" type="number" placeholder="Leg Lenght" value={measurment[1].LegLenght} required />
                                    <button className="btn btn-outline-success d-inline" type="submit">Save Measurment</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Cancle</button>
                                </form>
                            </div></div>
                            <li className="text-muted"> Length : {measurment[1].Length}</li>
                            <li className="text-muted"> Width : {measurment[1].Width}</li>
                            <li className="text-muted"> Neck : {measurment[1].Neck}</li>
                            <li className="text-muted"> Waist : {measurment[1].Waist}</li>
                            <li className="text-muted"> Bust : {measurment[1].Bust}</li>
                            <li className="text-muted"> Chest : {measurment[1].Chest}</li>
                            <li className="text-muted"> Arm Lenght : {measurment[1].ArmLenght}</li>
                            <li className="text-muted"> Shoulder Length : {measurment[1].Shoulder}</li>
                            <li className="text-muted"> Leg Lenght : {measurment[1].LegLenght}</li>
                            <button className="btn btn-outline-danger" onClick={() => document.getElementById("editM")?.classList.remove("d-none")} >Edit</button>
                            <button className="btn btn-outline-success">Cancle</button>
                        </div>)
                    }
                }) :
                null
            }
        </div>
    )
}
