import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkMeasurment, checkFirebaseMeasurment } from './index';
import firebase from 'firebase';
import { history } from './index';

export function EditMeasurment() {
    const customerState = useSelector((state: any) => state);
    const client: any = customerState.customer[0];
    const tailor: any = customerState.tailors[0];
    const dispatch = useDispatch();
    const saveMeasurment: any = (e: any) => {
        e.preventDefault();

        const [Length, Width, Neck, Chest, Waist, Bust, ArmLenght, ShoulderLenght, LegLenght] = e.target;
        const measurmentEle = {
            Length: Length.value, Width: Width.value, Chest: Chest.value, Bust: Bust.value, Waist: Waist.value, Neck: Neck.value, ArmLenght: ArmLenght.value, Shoulder: ShoulderLenght.value, LegLenght: LegLenght.value,
        }

        firebase.database().ref().on("child_added", snap => {
            const promise = firebase.firestore().collection('Customers').doc(tailor).collection(client).doc("Measurment").set({
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
            <div className="mr-5">
                <div id="editM">
                    {customerState.measurment.length > 0 ?
                        customerState.measurment.map((measurment: any, index: number) => {
                            let Length = measurment[1].Length;
                            const handleLength = (event: any) => {
                                Length = "";
                                console.log(Length, event.target.value);
                            };
                            if (measurment[0] === client) {
                                return (<form onSubmit={saveMeasurment}>
                                    <div className="EditM">
                                        <div>
                                            <label>Length</label>
                                            <input className="mt-1" type="number" placeholder="Length" onChange={(e) => {
                                                Length = "";
                                                e.target.value = ""
                                                console.log(e.target.value);

                                            }} value={Length} required />
                                        </div>
                                        <div>
                                            <label>Width</label>
                                            <input className="mt-1" type="number" placeholder="Width" required value={measurment[1].Width} />
                                        </div>
                                        <div> <label>Chest</label>
                                            <input className="mt-1" type="number" placeholder="Chest" required value={measurment[1].Chest} />
                                        </div>
                                    </div>
                                    <div className="EditM">
                                        <div>
                                            <label>Waist</label>
                                            <input className="mt-1" type="number" placeholder="Waist" required value={measurment[1].Waist} />
                                        </div>
                                        <div>
                                            <label>Bust</label>
                                            <input className="mt-1" type="number" placeholder="Bust" required value={measurment[1].Bust} />
                                        </div>
                                        <div>
                                            <label>Arm</label>
                                            <input className="mt-1" type="number" placeholder="Arm Lenght" required value={measurment[1].ArmLenght} />
                                        </div>
                                    </div>
                                    <div className="EditM">
                                        <div>
                                            <label>Shoulder</label>
                                            <input className="mt-1" type="number" placeholder="Shoulder Lenght" required value={measurment[1].Shoulder} />
                                        </div>
                                        <div>
                                            <label>Neck</label>
                                            <input className="mt-1" type="number" placeholder="Neck" required value={measurment[1].Neck} />
                                        </div>
                                        <div>
                                            <label>Leg Length</label>
                                            <input className="mt-1" type="number" placeholder="Leg Lenght" required value={measurment[1].LegLenght} />
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-success d-inline m-0 mt-1 w-25" type="submit">Edit Measurment</button>
                                    <button className="btn btn-outline-danger d-inline m-0 mt-1 ml-1 w-25" type="button" onClick={() => { history.push("/DashBoard"); history.replace('/DashBoard') }}>Cancle</button>
                                </form>)
                            }
                        })
                        :
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
            </div>
        </div >
    )
}

