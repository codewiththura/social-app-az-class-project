import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူခြင်း
import { getImageUrl } from "../services/api";

function PostCard({
  id,
  author,
  userId, // Post ပိုင်ရှင်ဖြစ်ကြောင်း စစ်ဆေးရန် User ID
  title,
  imageUrl,
  description,
  likesCount = 0,
  initialIsLiked = false,
  initialIsSaved = false,
  showDetailsLink = true,
}) {
  const { user } = useAuth(); // Login user context မှ ယူခြင်း
  const { deletePost, toggleLike, toggleSave } = usePosts(); // global actions များကို context မှ ယူခြင်း
  const navigate = useNavigate();

  // Login ဝင်ထားသော user နှင့် Post ရေးသူ တူညီမှု ရှိမရှိ စစ်ဆေးခြင်း
  const isOwner = user && Number(userId) === Number(user.id);

  // Post ကို delete လုပ်သည့် function
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confirmDelete) {
      try {
        await deletePost(id);
        // တကယ်လို့ Detail page မှ ဖျက်လိုက်ပါက Home သို့ အလိုအလျောက် ပြန်ပို့ပေးရန်
        if (!showDetailsLink) {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-4 shadow-sm">
      {/* Posted by နှင့် Edit/Delete actions */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-gray-500">Posted by {author}</p>

        {isOwner && (
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => navigate(`/edit-post/${id}`)}
              className="text-blue-600 hover:underline hover:cursor-pointer font-medium"
            >
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline hover:cursor-pointer font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <h2 className="text-md font-bold text-gray-900 mb-3">{title}</h2>
      <div>
        <img
          src={getImageUrl(imageUrl)}
          alt={title || "Post image"}
          className="w-full h-64 object-cover rounded"
        />
      </div>
      <p className="text-sm my-4 text-gray-700">{description}</p>

      <div className="flex justify-between items-center py-2">
        <span className="text-sm font-medium text-gray-600">{likesCount} likes</span>
        {showDetailsLink && id && (
          <Link
            to={`/post/${id}`}
            className="text-sm text-gray-600 font-medium hover:underline"
          >
            View Details
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-sm">
        <button
          onClick={() => toggleLike(id)}
          className={`flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 transition-colors ${
            initialIsLiked ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:cursor-pointer`}
        >
          {initialIsLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={() => navigate(`/post/${id}`)}
          className="flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 text-gray-600 hover:cursor-pointer"
        >
          Comment
        </button>
        <button
          onClick={() => toggleSave(id)}
          className={`flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 transition-colors ${
            initialIsSaved ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:cursor-pointer`}
        >
          {initialIsSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
