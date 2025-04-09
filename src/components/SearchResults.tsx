import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PostList from "./PostList";
import { Post } from "../services/apiService";

const POSTS_PER_PAGE = 5;

const SearchResults = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const baseURL =
    import.meta.env.MODE === "development"
      ? "/api/v1"
      : import.meta.env.VITE_BACKEND_URL;

    

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query && query.length >= 3) {
        try {
          setLoading(true);
          const response = await fetch(`${baseURL}/posts/search?query=${query}`);
          if (!response.ok) throw new Error("Failed to fetch search results.");
          const data = await response.json();
          setPosts(data);
        } catch (err: any) {
          setError(err.message || "An error occurred.");
        } finally {
          setLoading(false);
          setCurrentPage(1);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold">
        Search Results for{" "}
        <span className="text-primary">"{query || ""}"</span>
      </h2>

      {(!loading && posts.length === 0) ? (
        <p className="text-gray-500 text-lg">No results found.</p>
      ) : (
        <PostList
          posts={currentPosts}
          loading={loading}
          error={error}
          page={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          sortBy="createdAt"
          onSortChange={() => {}}
        />
      )}
    </div>
  );
};

export default SearchResults;
