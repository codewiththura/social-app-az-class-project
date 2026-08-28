import PostCard from "../components/PostCard";

function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 ">
      <h1 className="text-lg mb-4 ">Recent Posts</h1>
      <PostCard />
    </div>
  );
}

export default Home;
