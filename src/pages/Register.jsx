import React,{useState} from 'react'
import { Link } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email})
    })
    if (response.status === 200) {
      alert('Successfully registered');
      window.location.href = '/login';
    }
    else {
      alert('Error registering');
    }
  };
  return (
    <div className='custom_margin'>
      <h2 className='custom_margin text-center my-3'>Register</h2>
      <form className='col-md-3 col-10 mx-auto' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Username" className="form-label">Username</label>
          <input type="text" className="form-control" onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-outline-primary">Sign Up</button>
      </form>
      <div className="col-md-3 mt-3 mx-auto">
        Already have account ? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Register;