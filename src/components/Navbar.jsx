function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold">
          Social App
        </a>
        <div className="flex gap-4 items-center">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            Home
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            Create Post
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
