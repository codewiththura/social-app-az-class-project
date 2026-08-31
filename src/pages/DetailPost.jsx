import { Link, useParams } from "react-router";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူအသုံးပြုခြင်း
import PostCard from "../components/PostCard";
import CommentSession from "../components/CommentSession";

const DetailPost = () => {
  const { id } = useParams();
  const { posts, isLoading } = usePosts(); // Global context state ကို ယူသုံးခြင်း

  // Context posts စာရင်းထဲမှ လက်ရှိ post id နှင့် ကိုက်ညီသော post ကို ရှာဖွေခြင်း
  const post = posts.find((p) => p.id === Number(id));

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
        <p className="text-gray-600 mb-4">Post not found. (ပို့စ်ကို ရှာမတွေ့ပါ)</p>
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
        showDetailsLink={false}
      />

      <CommentSession postId={post.id} />
    </div>
  );
};

export default DetailPost;
