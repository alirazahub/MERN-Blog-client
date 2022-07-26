import React,{useContext} from 'react'
import { NavLink, Link } from 'react-router-dom'
import Toast from '../Toast';
import './navbar.css'
import {Context} from '../../context/Context'

function Navbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>

      <nav className="sticky-top navbar custom__bg navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand" to='/'>
            <Link to='' className='links'>
              <i className="fab fa-facebook-square"></i>
            </Link>
            <Link to='' className='links'>
              <i className="fab fa-twitter-square"></i>
            </Link>
            <Link to='' className='links'>
              <i className="fab fa-pinterest-square"></i>
            </Link>
            <Link to='' className='links'>
              <i className="fab fa-instagram-square"></i>
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/'>HOME</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/about'>ABOUT</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/contact'>CONTACT</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact activeClassName='active' className="nav-link" to='/write'>WRITE</NavLink>
              </li>
            </ul>


            {user ? <div ><Link to='/settings'> <img className="topImg" src={PF+ user.profilePic} alt="Profile_Image" /></Link>{user && <Link className="links" to='' onClick={handleLogout}>LOGOUT</Link>}</div>
              :
              <ul className="topList">
                <NavLink exact activeClassName='active' className="links" to="/login">LOGIN</NavLink>

                <NavLink exact activeClassName='active' className="links" to="/register">REGISTER</NavLink>

              </ul>}
            <i className="topSearchIcon fas fa-search"></i>
          </div>
        </div>
      </nav>
      <Toast message = "Hello World!"/>
    </>
  )
}

export default Navbar;