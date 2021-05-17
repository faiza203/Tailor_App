import React from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { checkFirebaseMeasurment, checkMeasurment } from "./index";
import { history } from "./history";
import { AlreadyMeasurment } from "./AlreadyMeasurment";
import { deleteClient } from "./store";
const measurments = [
  "Length",
  "Width",
  "Neck",
  "Chest",
  "Waist",
  "Bust",
  "Arm Lenght",
  "Shoulder Lenght",
  "Leg Lenght",
];

export function Measurment() {
  const customerState = useSelector((state: any) => state);
  const client: any = customerState.customer[0];
  const tailor: any = customerState.tailors[0];
  const dispatch = useDispatch();
  const promise = () => {
    firebase
      .firestore()
      .collection("Measurments")
      .doc(tailor)
      .collection("Customer")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((client) => {
          const clientName = client.id;
          const measurment = client.data().measurmentEle;
          checkFirebaseMeasurment(
            clientName,
            measurment,
            dispatch,
            customerState.measurment
          );
        });
      })
      .catch();
  };
  promise();
  let arr = [];
  return (
    <div>
      {customerState.measurment.length > 0 ? (
        customerState.measurment.map((measurment: any[], index: number) => {
          if (measurment[0] === client) {
            return <AlreadyMeasurment />;
          } else {
            arr.push("yes");
          }
        })
      ) : (
        <AddMeasurment />
      )}
      {customerState.measurment.length > 0 ? (
        arr.length === customerState.measurment.length ? (
          <AddMeasurment />
        ) : null
      ) : null}
    </div>
  );
}

export const AddMeasurment = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state: any) => state);
  const tailor = customerState.tailors[0];
  const client = customerState.customer[0];
  const promise = () => {
    firebase
      .firestore()
      .collection("Measurments")
      .doc(tailor)
      .collection("Customer")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((client) => {
          const clientName = client.id;
          const measurment = client.data().measurmentEle;
          checkFirebaseMeasurment(
            clientName,
            measurment,
            dispatch,
            customerState.measurment
          );
        });
      })
      .catch();
  };
  promise();

  const saveMeasurment: any = (e: any) => {
    e.preventDefault();

    const [
      Length,
      Width,
      Neck,
      Chest,
      Waist,
      Bust,
      ArmLenght,
      ShoulderLenght,
      LegLenght,
    ] = e.target;
    const measurmentEle = {
      Length: Length.value,
      Width: Width.value,
      Chest: Chest.value,
      Bust: Bust.value,
      Waist: Waist.value,
      Neck: Neck.value,
      ArmLenght: ArmLenght.value,
      Shoulder: ShoulderLenght.value,
      LegLenght: LegLenght.value,
    };
    const promise = firebase
      .firestore()
      .collection("Measurments")
      .doc(tailor)
      .collection("Customer")
      .doc(client)
      .set({
        measurmentEle,
      });
    promise.then(() => {
      checkMeasurment(
        client,
        measurmentEle,
        dispatch,
        customerState.measurment
      );
      history.push("/DashBoard");
      history.replace("/DashBoard");
      dispatch(deleteClient());
    });
    promise.catch((err) => {
      alert(err.message);
      dispatch(deleteClient());
    });
  };

  return (
    <div>
      {customerState.clients.length > 0 ? (
        <div className="measurment">
          <h1 className="h1 text-muted">Measurment</h1>
          <form className="mr-5 " onSubmit={saveMeasurment}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "2em",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "50em",
              }}
            >
              {measurments.map(function (measurmentE, index) {
                return (
                  <input
                    style={{ width: "12em" }}
                    className="form-control m-2"
                    type="number"
                    placeholder={measurmentE}
                    key={index}
                    // required
                  />
                );
              })}
            </div>
            <button
              style={{ width: "8em" }}
              className="btn btn-outline-success d-inline"
              type="submit"
            >
              Add
            </button>
            <button
              style={{ width: "8em" }}
              className="btn btn-outline-danger d-inline w-50"
              type="button"
              onClick={() => {
                history.push("/DashBoard");
                history.replace("/DashBoard");
              }}
            >
              Cancle
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="h1 font-italic text-muted">Please login first</h1>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              history.push("/SignIn");
              history.replace("/SignIn");
            }}
          >
            Go to Sign In
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              history.push("/SignUp");
              history.replace("/SignUp");
            }}
          >
            Go to Sign Up
          </button>
        </div>
      )}
    </div>
  );
};
