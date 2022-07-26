import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";

function SinglePost() {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  // getting post id from url
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setPost(data);
      setTitle(data.title);
      setDesc(data.description);
    }
    fetchPost();
  }, [postId]);


  const handleDelete = async () => {
    // eslint-disable-next-line
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user.username })
    });
    // const data = await response.json();
    window.location.replace("http://localhost:3000/");
  };

  const handleUpdate = async () => {
    // eslint-disable-next-line
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, description: desc, username: user.username })
    });
    // const data = await response.json();
    window.location.replace(`http://localhost:3000/post/${postId}`);
  }
  return (
    <>
      <div className="card mb-3">
        {post.photo ? <img className="singlePostImg" src={PF + post.photo} alt="." /> : <div className='text-center'> This Post doesn't have any Image</div>}
        <div className="card-body">
          <div className="row">
            {updateMode ? <div><label className="form-label">Update Title</label><input className="form-control singlePostDesc" type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input></div> : (
              <h5 className="col-md-9 card-title text-center ">{post.title}</h5>
            )}

            {post.username === user?.username && (
              <div className="col-md-3 singlePostIcon">
                {!updateMode && (<div><i
                  className="mx-3 fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                > </i>
                  <i
                    className="fa-solid fa-trash-can"
                    onClick={handleDelete}
                  ></i></div>)}

              </div>
            )}
          </div>
          <hr />
          <div className="singlePostInfo">
            <span>
              Author:
              <Link to={`/?user=${post.username}`}
                className="Link">
                <b> {post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? <div><label className="form-label">Update Description</label><textarea className="form-control singlePostDesc" type='text' value={desc} onChange={(e) => setDesc(e.target.value)} rows='3'></textarea></div> : (
            <p className="singlePostDesc">{post.description}</p>
          )}
          {updateMode && (
            <button className='mt-4 btn btn-outline-primary' onClick={handleUpdate}>Update</button>
          )}
        </div>
      </div>
    </>
  )
}

export default SinglePost;