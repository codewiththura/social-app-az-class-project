import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://api.codewiththura.com/api/posts")
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
      });
  }, []);

  console.log(posts);

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
          likeCounts={post.likesCount}
          initialIsLiked={post.isLiked}
        />
      ))}
    </div>
  );
}

export default Home;
