import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူခြင်း

const CreatePost = () => {
  const { loadPosts } = usePosts(); // global refresh function ယူခြင်း
  const [post, setPost] = useState({
    title: "",
    body: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        title: post.title,
        body: post.body,
        imageUrl: post.imageUrl,
      });
      await loadPosts(); // list အသစ်ကို context ထဲတွင် ပြန်ဆွဲရန်
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleOnChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto shadow-sm my-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h1>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleOnChange}
            placeholder="ခေါင်းစဉ်ရေးပါ..."
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleOnChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Content
          </label>
          <textarea
            rows="5"
            name="body"
            value={post.body}
            onChange={handleOnChange}
            placeholder="အကြောင်းအရာ အပြည့်အစုံရေးပါ..."
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-600"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
