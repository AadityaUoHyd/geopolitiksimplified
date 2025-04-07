import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
} from '@nextui-org/react';
import { apiService, Post, Category, Tag } from '../services/apiService';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt,desc");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
          apiService.getPosts({
            categoryId: selectedCategory ?? undefined,
            tagId: selectedTag ?? undefined,
          }),
          apiService.getCategories(),
          apiService.getTags(),
        ]);

        setPosts(postsResponse);
        setCategories(categoriesResponse);
        setTags(tagsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortBy, selectedCategory, selectedTag]);

  const handleCategoryChange = (categoryId: string | undefined) => {
    if (categoryId === "all") {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const topTags = tags
    .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="bg-gradient-to-tr from-white via-indigo-100 to-purple-100 shadow-xl border border-gray-200 rounded-3xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="pb-0 pt-6 px-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight flex items-center gap-2">
              📝 An opinion piece.
            </h1>
          </CardHeader>

          <CardBody className="space-y-6 px-6 pt-4 pb-6">
            {/* Categories displayed in column */}
            {/* Categories displayed in a row and wrapped if overflow */}

            {/* Categories in grid format - 6 per row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <button
                key="all"
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors duration-200 ${selectedCategory === undefined
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                All Posts
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors duration-200 ${selectedCategory === category.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {category.name} ({category.postCount})
                </button>
              ))}
            </div>


            {/* Tags centered and wrapped */}
            {topTags.length > 0 && (
              <div className="flex justify-center flex-wrap gap-3 pt-2">
                {topTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag.id ? undefined : tag.id)
                    }
                    className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 ${selectedTag === tag.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                  >
                    #{tag.name} ({tag.postCount})
                  </button>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <PostList
          posts={posts}
          loading={loading}
          error={error}
          page={page}
          sortBy={sortBy}
          onPageChange={setPage}
          onSortChange={setSortBy}
        />
      </div>
    </div>
  );
};

export default HomePage;
