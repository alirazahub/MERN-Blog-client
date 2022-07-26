import React from "react";
import SideBar from "../components/sidebar/SideBar";
import SinglePost from "../components/singlePost/SinglePost";

function Single() {
  return (
    <div className="row mx-auto container">
      <div className="col-md-9">
      <SinglePost />
      </div>
      <div className="col-md-3">
      <SideBar />
      </div>
    </div>
  );
}
export default Single;