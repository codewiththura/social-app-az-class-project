import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <h1 className="text-lg mb-4 ">Recent Posts</h1>
      {posts.map((post) => (
        <PostCard
          id={post.id}
          key={post.id}
          title={post.title}
          description={post.body}
          imageUrl={post.imageUrl}
          showDetailsLink={true}
        />
      ))}
    </div>
  );
}

export default Home;
