import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadPosts() {
    try {
      setIsLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

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
          onRefresh={loadPosts} // delete လုပ်ပြီးလျှင် list refresh ရန်
        />
      ))}
    </div>
  );
}

export default Home;
