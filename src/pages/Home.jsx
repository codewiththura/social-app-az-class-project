import { useState } from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူအသုံးပြုခြင်း
import SearchBar from "../components/SearchBar";

function Home() {
  // Context ထဲရှိ global posts list နှင့် isLoading state ကို ရယူသုံးစွဲခြင်း
  const { posts, isLoading } = usePosts();

  // Search input အတွက် state
  const [searchTerm, setSearchTerm] = useState("");

  // Search term နှင့် ကိုက်ညီသော post များကို စစ်ထုတ်ခြင်း (Derived State)
  const filteredPosts = posts.filter((post) => {
    const term = searchTerm.toLowerCase();
    const matchesTitle = post.title?.toLowerCase().includes(term);
    const matchesBody = post.body?.toLowerCase().includes(term);
    return matchesTitle || matchesBody;
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search Input Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-gray-700 font-bold text-lg">
          Recent Posts (မကြာသေးမှီက တင်ထားသောပိုစ့်များ)
        </h1>
        {searchTerm && (
          <span className="text-xs text-gray-500">
            Found {filteredPosts.length} post(s)
          </span>
        )}
      </div>

      {/* Post မရှိလျှင် သို့မဟုတ် Search ရလဒ် မတွေ့ပါက ပြသရန် */}
      {filteredPosts.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg text-gray-500 my-4">
          No posts found matching &quot;{searchTerm}&quot;. (ရှာဖွေမှု ရလဒ်
          မတွေ့ပါ)
        </div>
      ) : (
        filteredPosts.map((post) => (
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
        ))
      )}
    </div>
  );
}

export default Home;
