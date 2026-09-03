import { Link } from "react-router";

/**
 * NotFound Component (404 Page)
 * 
 * ဤ Component သည် ရောက်ရှိနေသော URL လမ်းကြောင်း (Route) ကို React Router မှ ရှာမတွေ့ပါက
 * Catch-all route (path="*") အဖြစ် ပြသပေးမည့် 404 Page ဖြစ်ပါသည်။
 * 
 * Beginner Friendly Explanation:
 * - path="*" ဟု Route ရေးသားလိုက်ပါက သတ်မှတ်ထားသော path များနှင့် မကိုက်ညီသော 
 *   မည်သည့် URL လမ်းကြောင်းမဆို ဤ 404 Page သို့ ရောက်ရှိလာပါမည်။
 */
const NotFound = () => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 text-center bg-white rounded-xl shadow-sm border border-gray-200">
      {/* 404 Visual Icon / Badge */}
      <div className="w-20 h-20 mx-auto mb-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl font-extrabold shadow-inner">
        404
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Page Not Found (စာမျက်နှာ ရှာမတွေ့ပါ)
      </h1>

      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        Oops! The page you are looking for does not exist or has been moved.
        <br />
        (မတောင်းပန်ပါသည်! သင်ရှာဖွေနေသော စာမျက်နှာ မရှိပါ သို့မဟုတ် လမ်းကြောင်း ပြောင်းသွားပါပြီ။)
      </p>

      {/* Return to Home Feed Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm"
      >
        <span>←</span> Back to Home (ပင်မစာမျက်နှာသို့ ပြန်သွားမည်)
      </Link>
    </div>
  );
};

export default NotFound;
