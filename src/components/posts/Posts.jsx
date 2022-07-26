import Post from "../post/Post";

function Posts(props) {
  return (
    <div className="row container">
      {props.posts.map((post,index)=>{
        return <Post key={index} post={post} />
      })}
    </div>
  );
}
export default Posts;