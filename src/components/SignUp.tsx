import firebase from 'firebase';
import { configFirebase } from './firebase';
import { history } from './history';
import { useDispatch, useSelector } from 'react-redux';
import { addTailor, checkCustomerFirebase } from './store';

configFirebase();

export function SignUp() {
    const dispatch = useDispatch();
    const customerState = useSelector((state: any) => state);
    const signUpFun = (e: any) => {
        e.preventDefault();
        const [email, password, confirmPassword]: any[] = e.target;
        const auth = firebase.auth();

        if (password.value !== confirmPassword.value) {
            alert("Password does not match");
        }
        else if (email.value === password.value) {
            alert("You have written email as password . Please change it for secure account")
        }
        else {
            auth.createUserWithEmailAndPassword(email.value, password.value)
                .then((user) => {
                    dispatch(addTailor(user.user?.email));
                    firebase.firestore().collection('Tailors').doc(e.target[0].value).collection('Customers').get()
                        .then(snapshot => {
                            snapshot.docs.forEach(clientsData => {
                                snapshot.docs.forEach(clientData => {
                                    const client = clientData.id;
                                    checkCustomerFirebase(client, customerState, dispatch);
                                });
                            })
                            history.push('/DashBoard');
                            history.replace('/DashBoard');
                            alert("Account is login successfully !!!");
                        }).catch()
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }
    return (
        <div className="main">
            <form onSubmit={signUpFun} className="form">
                <h2>Register With Us</h2>
                <label>Email :</label>
                <input type="email" placeholder="Please write email here" required />
                <label >Password :</label>
                <input type="password" placeholder="Enter password here" required />
                <label >Confirm Password :</label>
                <input type="password" placeholder="Rewrite password here" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
