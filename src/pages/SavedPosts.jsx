import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getSavedPosts } from "../services/api";

function SavedPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Saved post များကို API မှ ခေါ်ယူဖော်ပြခြင်း
  async function loadSavedPosts() {
    try {
      setIsLoading(true);
      const data = await getSavedPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load saved posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSavedPosts();
  }, []);

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
      
      {posts.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg text-gray-500">
          No saved posts found. (သိမ်းဆည်းထားသော ပို့စ်များ မရှိသေးပါ)
        </div>
      ) : (
        posts.map((post) => (
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
            onRefresh={loadSavedPosts} // post update ဖြစ်ပါက page ကို refresh ပြုလုပ်ရန်
          />
        ))
      )}
    </div>
  );
}

export default SavedPosts;
