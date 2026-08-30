import { useParams } from "react-router";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function DetailPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setPost(result);
      });
  });

  if (!post) {
    return <p> No posts to show</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <PostCard
        id={post.id}
        title={post.title}
        description={post.body}
        imageUrl={post.imageUrl}
        showDetailsLink={false}
      />
    </div>
  );
}
