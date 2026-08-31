import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူအသုံးပြုခြင်း

function Home() {
  // Context ထဲရှိ global posts list နှင့် isLoading state ကို ရယူသုံးစွဲခြင်း
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-gray-600 font-medium my-2 me-2 text-right">
        Recent Posts (မကြာသေးမှီက တင်ထားသောပိုစ့်များ)
      </h1>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          author={post.author.name}
          userId={post.userId} // owner စစ်ဆေးရန် userId prop ပေးခြင်း
          title={post.title}
          imageUrl={post.imageUrl}
          description={post.body}
          likesCount={post.likesCount}
          initialIsLiked={post.isLiked}
          initialIsSaved={post.isSaved}
        />
      ))}
    </div>
  );
}

export default Home;
