import firebase from 'firebase';
import { history } from './history';
import { useDispatch } from 'react-redux';
import { addTailor } from './store';



export function SignIn() {
  const dispatch = useDispatch();
  const signIn = (e: any) => {
    e.preventDefault();
    const [email, password]: any[] = e.target;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        dispatch(addTailor(e.target[0].value));
        alert("Account is login successfully !!!");
        history.push('/DashBoard');
        history.replace('/DashBoard');
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  return (
    <div className="main">
      <form onSubmit={signIn} className="form">
        <label>Email :</label>
        <input type="email" placeholder="Please write email here" required />
        <label>Password :</label>
        <input type="password" placeholder="Enter password here" required />
        <button type="submit">Sign In</button>
      </form >
    </div>
  )
}