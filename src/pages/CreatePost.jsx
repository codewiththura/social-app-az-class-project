import { useState } from "react";
import { createPost, uploadPostPhoto } from "../services/api";
import { useNavigate } from "react-router";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူခြင်း

const CreatePost = () => {
  const { loadPosts } = usePosts(); // global refresh function ယူခြင်း
  const navigate = useNavigate();

  // စာသားအချက်အလက်များအတွက် State
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // ရွေးချယ်လိုက်သော Image File နှင့် Browser Preview URL အတွက် State
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Form submit / upload လုပ်နေစဉ် ခလုတ်ပိတ်ထားရန် State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Input text ပြောင်းလဲမှုကို ဖမ်းယူခြင်း
  const handleOnChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // အသုံးပြုသူ ပုံရွေးချယ်လိုက်သည့်အခါ လုပ်ဆောင်ခြင်း
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Browser Memory ထဲတွင် ယာယီ preview url ထုတ်ယူပြသခြင်း
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  // ရွေးချယ်ထားသော ပုံကို ဖယ်ရှားရန် (Cancel / Remove)
  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // Memory leak မဖြစ်စေရန် release လုပ်ခြင်း
    }
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Form Submit လုပ်ဆောင်ချက်
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!post.title.trim()) {
      setErrorMessage("ကျေးဇူးပြု၍ ခေါင်းစဉ် (Title) ထည့်သွင်းပေးပါ");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // အဆင့် (၁) - ပို့စ်အသစ်ကို Title နှင့် Body ဖြင့် အရင် Create လုပ်ပြီး ID ရယူခြင်း
      const newPost = await createPost({
        title: post.title,
        body: post.body,
      });

      // အဆင့် (၂) - အကယ်၍ ပုံရွေးချယ်ထားပါက ရရှိလာသော Post ID ဖြင့် ဓာတ်ပုံကို Upload တင်ခြင်း
      if (imageFile && newPost?.id) {
        await uploadPostPhoto(newPost.id, imageFile);
      }

      // အဆင့် (၃) - PostContext တွင် post စာရင်းကို refresh ပြန်ဆွဲပြီး Home သို့ ပြန်ပို့ပေးခြင်း
      await loadPosts();
      navigate("/");
    } catch (error) {
      console.error("Failed to create post with image:", error);
      setErrorMessage(error.message || "Post ဖန်တီးရာတွင် အမှားအယွင်းရှိပါသည်");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto shadow-sm my-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h1>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleOnSubmit} className="space-y-4">
        {/* Post Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Title <span className="text-red-500">*</span>
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

        {/* Real Image File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image (ဓာတ်ပုံတင်ရန်)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supports JPG, PNG, GIF, WEBP, SVG (Max 5MB)
          </p>

          {/* Image Preview (ပုံရွေးချယ်ထားပါက ချက်ချင်း preview ပြသခြင်း) */}
          {previewUrl && (
            <div className="mt-3 relative border border-gray-200 rounded-md overflow-hidden bg-gray-50 p-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-600">
                  Image Preview ({imageFile?.name})
                </span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-red-600 hover:underline font-medium"
                >
                  ✕ Remove
                </button>
              </div>
              <img
                src={previewUrl}
                alt="Selected Preview"
                className="w-full h-56 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Post Content */}
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

        {/* Submit & Cancel Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-5 py-2 text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Publishing & Uploading..." : "Publish Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
