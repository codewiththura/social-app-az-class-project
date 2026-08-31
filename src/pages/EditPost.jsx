import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPostById, updatePost } from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    body: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPostById(id);
        if (postData) {
          setPost({
            title: postData.title || "",
            imageUrl: postData.imageUrl || "",
            body: postData.body || "",
          });
        }
      } catch (error) {
        console.error("Failed to load post data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [id]);

  // Form submit လုပ်ပြီး Post အချက်အလက်များကို update လုပ်ခြင်း
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      navigate(`/post/${id}`); // details စာမျက်နှာသို့ ပြန်သွားရန်
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleOnChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading post details...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto shadow-sm my-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Edit Post</h1>
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
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
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
            required
          ></textarea>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 hover:cursor-pointer"
          >
            Save Changes (သိမ်းဆည်းရန်)
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 hover:cursor-pointer"
          >
            Cancel (မလုပ်တော့ပါ)
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
