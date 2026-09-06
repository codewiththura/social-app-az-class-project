import { useParams } from "react-router";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import CommentSession from "../components/CommentSession";

export default function DetailPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.codewiththura.com/api/posts/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setPost(result);
      });
  }, [id]);

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
        likeCounts={post.likesCount}
        initialIsLiked={post.isLiked}
      />

      <CommentSession postId={id} />
    </div>
  );
}
