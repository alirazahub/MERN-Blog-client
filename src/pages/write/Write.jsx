import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = ({
      username: user.username,
      title,
      desc,
      tag,
    })
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log("error 1");
      }
    }
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        title: title,
        description: desc,
        categories: tag,
        photo: newPost.photo,
      })
    })
    const res = await response.json();
    window.location.replace("http://localhost:3000/post/" + res._id);

  };
  return (
    <>
      <div className="container my-4 write">
        {file && (
          <img className="writeImg"
            src={URL.createObjectURL(file)}
            alt="" />
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="fileInput">
            <div className="writeIcon">
              <i className="fas fa-plus"></i>
            </div>

          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="container col-md-5">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input type="text" className="form-control" placeholder="Taggs" onChange={(e) => setTag(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" placeholder='Tell your story .....' rows="4" onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
          </div>
          <div className="col-md-1 mx-auto">
            <button type="submit" className='btn btn-outline-primary'>Publish</button>
          </div>
        </form>
      </div>

    </>
  )
};
export default Write;