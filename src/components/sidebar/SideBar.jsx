import React,{useState,useEffect} from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'

function SideBar() {
  const [cat , setCat] = useState([]);
  useEffect(() => {
    const fetchCat = async () => {
      const response = await fetch('http://localhost:5000/api/categories',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setCat(data);
    }
    fetchCat();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((cat,index) => (
            <Link className='Link' key={index} to={`/?cat=${cat.name}`}>
            <li>{cat.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Link to='' className='sidebarIcon'><i className="fab fa-facebook-square"></i></Link>
          <Link to='' className='sidebarIcon'><i className="fab fa-instagram-square"></i></Link>
          <Link to='' className='sidebarIcon'><i className="fab fa-pinterest-square"></i></Link>
          <Link to='' className='sidebarIcon'><i className="fab fa-twitter-square"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar;