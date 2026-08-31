import { createContext, useContext, useEffect, useState } from "react";
import {
  getPosts,
  deletePost as apiDeletePost,
  toggleLikePost,
  toggleSavePost,
} from "../services/api";

// ၁။ PostContext တည်ဆောက်ခြင်း
const PostContext = createContext(null);

// ၂။ Provider Component တည်ဆောက်ခြင်း (Post နဲ့ဆိုင်တဲ့ state/actions အားလုံးကို global handle လုပ်ပေးမည်)
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Post အားလုံးကို load လုပ်မည့် function
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

  // App စတင်ချိန်တွင် post များကို တစ်ကြိမ်တည်း ခေါ်ယူထားခြင်း
  useEffect(() => {
    loadPosts();
  }, []);

  // Post ဖျက်ရန် function
  async function deletePost(id) {
    try {
      await apiDeletePost(id);
      // State ထဲမှ ဖျက်လိုက်သော post ကို ဖယ်ထုတ်ပြီး ချက်ချင်း UI update ဖြစ်စေခြင်း
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      throw error;
    }
  }

  // Like / Unlike လုပ်ရန် function
  async function toggleLike(id) {
    try {
      const updatedPost = await toggleLikePost(id);
      if (updatedPost) {
        // ပြောင်းလဲသွားသော post တစ်ခုတည်းကို ရှာပြီး state ထဲတွင် အစားထိုးခြင်း
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }

  // Save / Unsave လုပ်ရန် function
  async function toggleSave(id) {
    try {
      const updatedPost = await toggleSavePost(id);
      if (updatedPost) {
        // ပြောင်းလဲသွားသော post တစ်ခုတည်းကို ရှာပြီး state ထဲတွင် အစားထိုးခြင်း
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
      }
    } catch (error) {
      console.error("Failed to toggle save:", error);
    }
  }

  // ကယ်တင်/သိမ်းဆည်းထားသော ပို့စ်များကို dynamically filter လုပ်ယူခြင်း (Computed State)
  const savedPosts = posts.filter((post) => post.isSaved);

  const value = {
    posts,
    savedPosts,
    isLoading,
    loadPosts,
    deletePost,
    toggleLike,
    toggleSave,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

// ၃။ Custom Hook - Component များတွင် usePosts() ဟု ခေါ်ယူသုံးစွဲနိုင်ရန်
export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
