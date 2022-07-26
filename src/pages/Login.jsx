import React, { useContext, useRef } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../context/Context';
import axios from 'axios';


function Login() {
  //ref is used instead of onchange event
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <div className='custom_margin'>
        <h2 className='text-center my-3'>Login</h2>
        <form className='col-md-3 col-10 mx-auto' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">Username</label>
            <input type="text" className="form-control" ref={userRef} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" ref={passwordRef} />
          </div>
          <button type="submit" className="btn btn-outline-primary">Login</button>
        </form>
        <div className="col-md-3 mt-3 mx-auto">
          Don't have account ? <Link to="/register">Click here to Register</Link>
        </div>

      </div>
    </>
  )
}

export default Login;
