function SearchBar({
  value,
  onChange,
  placeholder = "Search posts by title or content... (ပို့စ်များ ရှာဖွေရန်)",
}) {
  return (
    <div className="relative w-full mb-6">
      {/* ဘယ်ဘက် Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <path d="M0 0h1024v1024H0z" fill="none" />
        <path
          fill="currentColor"
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1S492.1 112 412 112s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6M570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4"
        />
      </svg>

      {/* Search Input Box (ညာဘက် icon မထပ်စေရန် pr-10 ထည့်ထားပါသည်) */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 pl-12 pr-10 text-sm focus:outline-none focus:border-blue-600 shadow-sm"
      />

      {/* စာရိုက်ထားမှသာ ပေါ်လာမည့် Clear (X) ခလုတ် */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3.29 10.29a1 1 0 0 1 0 1.42a1 1 0 0 1-1.42 0L12 13.41l-1.29 1.3a1 1 0 0 1-1.42 0a1 1 0 0 1 0-1.42l1.3-1.29l-1.3-1.29a1 1 0 0 1 1.42-1.42l1.29 1.3l1.29-1.3a1 1 0 0 1 1.42 1.42L13.41 12Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
