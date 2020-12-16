import { useSelector, useDispatch } from 'react-redux';
import { checkMeasurment, deleteClient } from './index';
import { history } from './index';
import firebase from 'firebase';

export function EditMeasurment() {
    const customerState = useSelector((state: any) => state);
    const client: any = customerState.customer[0];
    const tailor: any = customerState.tailors[0];
    const dispatch = useDispatch();
    const saveMeasurment: any = (e: any) => {
        e.preventDefault();
        let previousMeasurment;
        const [Length, Width, Neck, Chest, Waist, Bust, ArmLenght, ShoulderLenght, LegLenght] = e.target;
        customerState.measurment.map((measurment: any, index: number) => {
            if (measurment[0] === client) {
                previousMeasurment = measurment[1];
                const measurmentEle = {
                    Length: Length.value > 0 ? Length.value : previousMeasurment.Length, Width: Width.value > 0 ? Width.value : previousMeasurment.Width, Chest: Chest.value > 0 ? Chest.value : previousMeasurment.Chest, Bust: Bust.value > 0 ? Bust.value : previousMeasurment.Bust, Waist: Waist.value > 0 ? Waist.value : previousMeasurment.Waist, Neck: Neck.value > 0 ? Neck.value : previousMeasurment.Neck, ArmLenght: ArmLenght.value > 0 ? ArmLenght.value : previousMeasurment.ArmLenght, Shoulder: ShoulderLenght.value > 0 ? ShoulderLenght.value : previousMeasurment.Shoulder, LegLenght: LegLenght.value > 0 ? LegLenght.value : previousMeasurment.LegLenght,
                };
                const promise = firebase.firestore().collection('Measurments').doc(tailor).collection("Customer").doc(client).set({
                    measurmentEle
                });
                promise.then(() => {
                    checkMeasurment(tailor, client, measurmentEle, dispatch, customerState.measurment);
                    history.push("/Measurment");
                    history.replace("/Measurment");
                    dispatch(deleteClient());
                })
                promise.catch((err) => {
                    alert(err.message);
                    dispatch(deleteClient());
                })
            }

        });
    }





    return (
        <div >
            <div className="mr-5">
                {customerState.measurment.length > 0 ?
                    customerState.measurment.map((measurment: any, index: number) => {
                        if (measurment[0] === client) {
                            return (
                                <div id="editM">
                                    <form onSubmit={saveMeasurment} key={index}>
                                        <div className="EditM">
                                            <div>
                                                <label>Length</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Length} />
                                            </div>
                                            <div>
                                                <label>Width</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Width} />
                                            </div>
                                            <div> <label>Chest</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Chest} />
                                            </div>
                                        </div>
                                        <div className="EditM">
                                            <div>
                                                <label>Waist</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Waist} />
                                            </div>
                                            <div>
                                                <label>Bust</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Bust} />
                                            </div>
                                            <div>
                                                <label>Arm</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].ArmLenght} />
                                            </div>
                                        </div>
                                        <div className="EditM">
                                            <div>
                                                <label>Shoulder</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Shoulder} />
                                            </div>
                                            <div>
                                                <label>Neck</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].Neck} />
                                            </div>
                                            <div>
                                                <label>Leg Length</label>
                                                <input className="mt-1" type="number" placeholder={measurment[1].LegLenght} />
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-success d-inline m-0 mt-1 w-25" type="submit">Edit Measurment</button>
                                        <button className="btn btn-outline-danger d-inline m-0 mt-1 ml-1 w-25" onClick={() => {
                                            history.push("/Measurment"); history.replace('/Measurment')
                                            dispatch(deleteClient());
                                        }}>Cancle</button>
                                    </form>
                                </div>
                            )
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
        </div >
    )
}


