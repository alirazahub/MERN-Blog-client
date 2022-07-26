import React,{useState, useEffect} from 'react'
import Header from "../components/header/Header";
import Posts from "../components/posts/Posts";
import Sidebar from "../components/sidebar/SideBar";
import { useLocation } from 'react-router';

function HomePage() {
  const {search} = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const url = `http://localhost:5000/api/posts${search}`;
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[search]);
  return (
    <div className='container'>
      <Header />
      <div className="row">
        <div className="col-md-9">
          <Posts posts={posts} />
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default HomePage
