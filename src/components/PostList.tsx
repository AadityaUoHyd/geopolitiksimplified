import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Pagination
} from '@nextui-org/react';
import { Post } from '../services/apiService';
import { Calendar, Clock, Tag } from 'lucide-react';
import DOMPurify from 'dompurify';

interface PostListProps {
  posts: Post[] | null;
  loading: boolean;
  error: string | null;
  page: number;
  sortBy: string;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  error,
  page,
  onPageChange,
}) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createExcerpt = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
      ALLOWED_ATTR: [],
    });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sanitizedContent;
    let textContent = tempDiv.textContent || tempDiv.innerText || '';
    textContent = textContent.trim();

    if (textContent.length > 200) {
      textContent = textContent.substring(0, 200).split(' ').slice(0, -1).join(' ') + '...';
    }

    return textContent;
  };

  const navToPostPage = (post: Post) => {
    navigate(`/posts/${post.id}`);
  };

  // ✅ Sort & Paginate
  const sortedPosts = posts
    ? [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const postsPerPage = 5;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full animate-pulse">
              <CardBody>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedPosts.map((post) => (
              <Card
                key={post.id}
                className="w-full p-2"
                isPressable
                onPress={() => navToPostPage(post)}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-left">{post.title}</h2>
                        <p className="text-small text-default-500 text-left">
                          by {post.author?.name}
                        </p>
                      </div>
                    </CardHeader>

                    <CardBody>
                      <p className="line-clamp-3">{createExcerpt(post.content)}</p>
                    </CardBody>

                    <CardFooter className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-small text-default-500">
                        <Calendar size={16} />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="flex items-center gap-1 text-small text-default-500">
                        <Clock size={16} />
                        {post.readingTime} min read
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Chip className="bg-primary-100 text-primary">
                          {post.category.name}
                        </Chip>
                        {post.tags.map((tag) => (
                          <Chip
                            key={tag.id}
                            className="bg-default-100"
                            startContent={<Tag size={14} />}
                          >
                            {tag.name}
                          </Chip>
                        ))}
                      </div>
                    </CardFooter>
                  </div>

                  {/* RIGHT SIDE: Landscape Image */}
                  {post.imageUrl && (
                    <div className="flex-shrink-0 aspect-video w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 m-4 mr-0 p-4 pr-0 self-center rounded-xl overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110 shadow-2xl"
                      />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* ✅ Pagination Component */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                total={totalPages}
                page={page}
                onChange={onPageChange}
                showControls
                className="bg-white px-4 py-2 rounded-xl shadow-md"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
