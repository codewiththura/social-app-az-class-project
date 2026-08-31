import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူသုံးစွဲခြင်း

function SavedPosts() {
  // Context ထဲရှိ savedPosts (computed) နှင့် isLoading state ကို တိုက်ရိုက် ရယူသုံးစွဲခြင်း
  const { savedPosts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading saved posts...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-gray-600 font-medium my-2 me-2 text-right">
        Saved Posts (သိမ်းဆည်းထားသော ပို့စ်များ)
      </h1>
      
      {savedPosts.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg text-gray-500">
          No saved posts found. (သိမ်းဆည်းထားသော ပို့စ်များ မရှိသေးပါ)
        </div>
      ) : (
        savedPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author.name}
            userId={post.userId}
            title={post.title}
            imageUrl={post.imageUrl}
            description={post.body}
            likesCount={post.likesCount}
            initialIsLiked={post.isLiked}
            initialIsSaved={post.isSaved}
          />
        ))
      )}
    </div>
  );
}

export default SavedPosts;
