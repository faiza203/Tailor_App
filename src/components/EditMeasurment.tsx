import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkMeasurment, checkFirebaseMeasurment } from './index';
import firebase from 'firebase';
import { history } from './index';

export function EditMeasurment() {
    const tailor: any = localStorage.getItem("tailor");
    const client: any = localStorage.getItem("customer");
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
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
    const measurment: any = localStorage.getItem("measurment");
    console.log(customerState);

    return (
        <div >
            <div className="mr-5">
                <div id="editM">
                    {customerState.measurment.length > 0 ?
                        customerState.measurment.map((measurment: any, index: number) => {
                            if (measurment[0] === client) {
                                return (<form>{measurment[0]}
                                    <input className="form-control" type="number" placeholder="Length" value={measurment[0].Length} required />
                                    <input className="form-control mt-1" type="number" placeholder="Width" required value={measurment[0].Length} />
                                    <input className="form-control mt-1" type="number" placeholder="Neck" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Chest" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Waist" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Bust" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Arm Width" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Shoulder Width" required value={measurment[0].Lenght} />
                                    <input className="form-control mt-1" type="number" placeholder="Leg Lenght" required value={measurment[0].Lenght} />
                                    <button className="btn btn-outline-success d-inline" type="submit">Save Measurment</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Cancle</button>
                                </form>)
                            }
                        })
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

