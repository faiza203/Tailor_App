import React from 'react';
import { Customers, deleteTailor, checkCustomer, history } from './index';
import { useDispatch, useSelector } from 'react-redux';

export function DashBoard() {
    const customerState = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const addCustomer = (e: any) => {
        e.preventDefault();
        const customer: string = e.target[0].value;
        checkCustomer(customer.toUpperCase(), customerState, dispatch);
        e.target[0].value = "";
    }
  console.log(customerState);
  
    return (
        <div>
            {
                customerState.tailors[0] ?
                    <div className="text-right">
                        <h1 className="h1 font-italic text-muted text-center">
                            {customerState.tailors[0]}
                        </h1>
                        <form onSubmit={addCustomer} className=" text-center">
                            <input className="d-inline " type="text" placeholder="Add Customer Name Here" required />
                            <button className="btn btn-outline-secondary d-inline mt-1 w-50">Add customer
            </button>
                        </form>
                        <Customers name={customerState.tailors[0]} />
                        <button className="btn btn-outline-dark  mb-1 text-end signOut" onClick={() => dispatch(deleteTailor())}>Sign Out</button>
                    </div>
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
    )
}
