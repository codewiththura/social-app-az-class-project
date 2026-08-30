import { useState } from "react";
import { Link } from "react-router";

function PostCard({ id, title, description, imageUrl, showDetailsLink }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function handleLike() {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  }

  function handleSave() {
    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-4">
      <h2 className="text-md font-bold text-gray-900 mb-3">{title}</h2>
      <div>
        <img src={imageUrl} alt="Image" className="w-full h-64 object-cover" />
      </div>
      <p className="text-sm my-4">{description}</p>

      <div className="flex justify-between items-center py-2">
        <span>{likes} likes</span>
        {showDetailsLink && <Link to={`/post/${id}`}>View Details</Link>}
      </div>
      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-sm">
        <button
          onClick={handleLike}
          className={`py-1.5 font-medium text-center rounded hover:bg-gray-50 ${isLiked ? "text-blue-600" : "text-gray-600"} hover:cursor-pointer`}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <button className="py-1.5 font-medium text-center rounded hover:bg-gray-50 text-gray-600 hover:cursor-pointer">
          Comment
        </button>
        <button
          onClick={handleSave}
          className={`py-1.5 font-medium text-center rounded hover:bg-gray-50 ${isSaved ? "text-blue-600" : "text-gray-600"} hover:cursor-pointer`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
