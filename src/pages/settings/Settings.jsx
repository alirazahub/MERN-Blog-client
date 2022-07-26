import React,{useContext,useState} from 'react'
import SideBar from '../../components/sidebar/SideBar'
import  { Link } from 'react-router-dom'
import './settings.css'
import { Context } from '../../context/Context';
import axios from 'axios';


function Setting() {
  const PF = "http://localhost:5000/images/";
  const { user,dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = ({
      userID: user._id,
      username,
      email,
      password,
    })
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
      }
    }
    //Eslint-disable-next-line
    const response = await fetch('http://localhost:5000/api/users/'+user._id , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    dispatch({ type: "LOGOUT" });

  };

  // console.log(userID);

  const deleteUser = async (e) => {
    e.preventDefault();
    //Eslint-disable-next-line
    const response = await fetch('http://localhost:5000/api/users/'+user._id , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID:user._id, username: user.username })
    })
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className='row container-fluid'>
    <div className='col-md-9'>
    <div className='custom_margin'>
      <h2 className='custom_margin text-center my-3'>Update Information</h2>
      <form className='col-md-6 col-10 mx-auto' onSubmit={handleUpdate}>
      <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt="Profile_Image"
            />
            <label htmlFor="fileInput">
              <div className="settingsPPIcon">
              <i className="far fa-user-circle"></i>

              </div>
            </label>
            
            <input className='input-file'
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">UserName</label>
          <input type="text" className="form-control" placeholder={user.username} onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder={user.email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">Update</button>
        
      </form>
      <div className="col-md-2 mt-3 mx-auto">
        <Link onClick={deleteUser}>Delete Account<i className="fa-solid fa-trash-can"></i></Link>
      </div>
    </div>
    </div>
    <div className='col-md-3'>
    <SideBar />

    </div>
    </div>
  )
}

export default Setting