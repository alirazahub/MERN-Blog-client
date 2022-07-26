import React from "react";
import { Link } from "react-router-dom";
import "./post.css";

function Post(props) {
  const PF = "http://localhost:5000/images/";
  return (
    <>
        <div className="my-3 col-md-4 col-10 card">
          {props.post.photo?(
            <img src={PF+props.post.photo} className="card-img-top" alt="." />
          ):(<div className="text-center">This Post Don't have any image</div>)}
          <div className="card-body">
          <div className="text-center postCats">
          {props.post.categories.map((cat,index)=>{
              return <span key={index} className="postCat">{cat}</span>
            })}
          </div>
          <Link className="Link" to={`/post/${props.post._id}`}>
            <h5 className="postTitle text-center">{props.post.title}</h5>
          </Link>
            <hr />
            <div className="postDate my-4 text-center">
            {new Date(props.post.createdAt).toDateString()}
          </div>
            <p className="postDesc card-text">{props.post.description}</p>
          </div>
        </div>
    </>
  );
}
export default Post;