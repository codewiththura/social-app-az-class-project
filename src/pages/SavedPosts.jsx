import { useState } from "react";
import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူသုံးစွဲခြင်း
import SearchBar from "../components/SearchBar";

function SavedPosts() {
  // Context ထဲရှိ savedPosts (computed) နှင့် isLoading state ကို တိုက်ရိုက် ရယူသုံးစွဲခြင်း
  const { savedPosts, isLoading } = usePosts();

  // Search input အတွက် state
  const [searchTerm, setSearchTerm] = useState("");

  // Saved posts ထဲမှ search term နှင့် ကိုက်ညီသော post များကို စစ်ထုတ်ခြင်း
  const filteredSavedPosts = savedPosts.filter((post) => {
    const term = searchTerm.toLowerCase();
    const matchesTitle = post.title?.toLowerCase().includes(term);
    const matchesBody = post.body?.toLowerCase().includes(term);
    return matchesTitle || matchesBody;
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-gray-500">
        Loading saved posts...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search Input Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-gray-700 font-bold text-lg">
          Saved Posts (သိမ်းဆည်းထားသော ပို့စ်များ)
        </h1>
        {searchTerm && (
          <span className="text-xs text-gray-500">
            Found {filteredSavedPosts.length} post(s)
          </span>
        )}
      </div>

      {filteredSavedPosts.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg text-gray-500 my-4">
          {searchTerm
            ? `No saved posts found matching "${searchTerm}".`
            : "No saved posts found. (သိမ်းဆည်းထားသော ပို့စ်များ မရှိသေးပါ)"}
        </div>
      ) : (
        filteredSavedPosts.map((post) => (
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
