import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    body: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("POST to server");
      const response = await fetch("https://api.codewiththura.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        console.error("HTTP error");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border border-gray-200 rounded-lg max-w-xl mx-auto my-4 p-6">
      <h1 className="text-2xl mb-4">Create Post</h1>
      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <label className="block text-sm font-medium mb-1">Post Title</label>
        <input
          type="text"
          name="title"
          value={post.title}
          className="w-full border border-gray-200 rounded-md p-3 text-sm"
          onChange={handleOnChange}
        />
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={post.imageUrl}
          className="w-full border border-gray-200 rounded-md p-3 text-sm"
          onChange={handleOnChange}
        />
        <label className="block text-sm font-medium">Post Content</label>
        <textarea
          name="body"
          value={post.value}
          onChange={handleOnChange}
          className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}
