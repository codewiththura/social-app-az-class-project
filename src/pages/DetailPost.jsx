import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getPostById } from "../services/api";
import PostCard from "../components/PostCard";
import CommentSession from "../components/CommentSession";

const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getPostData() {
    try {
      setIsLoading(true);
      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPostData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading post details...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <p className="text-gray-600 mb-4">Post not found.</p>
        <Link to="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link
        to="/"
        className="text-sm text-blue-600 font-medium hover:underline inline-block mb-4"
      >
        ← Back to Posts
      </Link>

      <PostCard
        id={post.id}
        author={post.author.name}
        userId={post.userId} // owner စစ်ရန် userId ပေးခြင်း
        title={post.title}
        imageUrl={post.imageUrl}
        description={post.body}
        likesCount={post.likesCount}
        initialIsLiked={post.isLiked}
        initialIsSaved={post.isSaved}
        onRefresh={getPostData} // delete လုပ်ပြီးနောက် state update လုပ်ရန်
        showDetailsLink={false}
      />

      <CommentSession postId={post.id} />
    </div>
  );
};

export default DetailPost;
