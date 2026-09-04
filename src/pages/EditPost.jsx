import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getPostById, updatePost, uploadPostPhoto, getImageUrl } from "../services/api";
import { usePosts } from "../context/PostContext"; // PostContext Hook ကို ခေါ်ယူခြင်း

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadPosts } = usePosts(); // global refresh function ယူခြင်း

  // Post Title နှင့် Body အတွက် State
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // လက်ရှိ ရှိပြီးသား ဓာတ်ပုံ URL
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // အသစ်လဲလှယ်မည့် Image File နှင့် Preview URL State
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // စတင်ချိန်တွင် ရှိပြီးသား Post data ကို ဆာဗာမှ ဆွဲယူခြင်း
  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPostById(id);
        if (postData) {
          setPost({
            title: postData.title || "",
            body: postData.body || "",
          });
          setCurrentImageUrl(postData.imageUrl || "");
        }
      } catch (error) {
        console.error("Failed to load post data:", error);
        setErrorMessage("ပို့စ် အချက်အလက် ဆွဲယူရာတွင် အမှားဖြစ်ပေါ်နေပါသည်");
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [id]);

  // Input text ပြောင်းလဲမှုများကို state တွင် update လုပ်ခြင်း
  const handleOnChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // အသစ်ထည့်မည့် ဓာတ်ပုံဖိုင် ရွေးချယ်မှု
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // ရွေးချယ်လိုက်သော ပုံအသစ်အတွက် ယာယီ preview url တည်ဆောက်ခြင်း
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  // ရွေးချယ်ထားသော ပုံအသစ်ကို ပယ်ဖျက်ရန်
  const handleRemoveNewImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
  };

  // Form submit လုပ်ပြီး Post နှင့် Image ကို Update လုပ်ခြင်း
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!post.title.trim()) {
      setErrorMessage("ကျေးဇူးပြု၍ ခေါင်းစဉ် (Title) ထည့်သွင်းပေးပါ");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // အဆင့် (၁) - Title နှင့် Body စာသားများကို အရင် Update ပြုလုပ်ခြင်း
      await updatePost(id, {
        title: post.title,
        body: post.body,
      });

      // အဆင့် (၂) - အကယ်၍ ဓာတ်ပုံအသစ် ရွေးချယ်ထားပါက backend သို့ upload တင်ခြင်း
      // Backend မှ ၎င်း post ID ၏ ယခင်ပုံအဟောင်းကို အလိုအလျောက် overwrite အစားထိုးပေးမည်ဖြစ်သည်
      if (imageFile) {
        await uploadPostPhoto(id, imageFile);
      }

      // အဆင့် (၃) - PostContext တွင် global post စာရင်းကို refresh လုပ်ပြီး Detail page သို့ ပြန်သွားခြင်း
      await loadPosts();
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Failed to update post:", error);
      setErrorMessage(error.message || "ပို့စ် ပြင်ဆင်ရာတွင် အမှားအယွင်းရှိပါသည်");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-6 text-gray-500">Loading post details...</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto shadow-sm my-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Edit Post (ပို့စ်ပြင်ဆင်ရန်)</h1>

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

        {/* Post Image: Current View & File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Photo (ဓာတ်ပုံ ပြောင်းလဲရန်)
          </label>

          {/* လက်ရှိ ရှိပြီးသား ဓာတ်ပုံ (အသစ်မရွေးရသေးပါက ပြသမည်) */}
          {!previewUrl && currentImageUrl && (
            <div className="mb-3 border border-gray-200 rounded-md overflow-hidden bg-gray-50 p-2">
              <span className="block text-xs font-medium text-gray-500 mb-2">
                Current Photo:
              </span>
              <img
                src={getImageUrl(currentImageUrl)}
                alt="Current Post"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}

          {/* ဖိုင်အသစ် ရွေးချယ်သည့် input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Select a new image to replace the current photo (Max 5MB)
          </p>

          {/* ရွေးချယ်လိုက်သော ပုံအသစ် Preview */}
          {previewUrl && (
            <div className="mt-3 relative border border-blue-200 rounded-md overflow-hidden bg-blue-50/30 p-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-blue-700">
                  New Photo Preview ({imageFile?.name})
                </span>
                <button
                  type="button"
                  onClick={handleRemoveNewImage}
                  className="text-xs text-red-600 hover:underline font-medium"
                >
                  ✕ Keep Current Photo
                </button>
              </div>
              <img
                src={previewUrl}
                alt="New Preview"
                className="w-full h-48 object-cover rounded border border-blue-200"
              />
            </div>
          )}
        </div>

        {/* Post Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Content <span className="text-red-500">*</span>
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

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-5 py-2 text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Saving & Uploading..." : "Save Changes (သိမ်းဆည်းရန်)"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancel (မလုပ်တော့ပါ)
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
