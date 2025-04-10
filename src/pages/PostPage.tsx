// PostPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Divider,
  Avatar,
} from '@nextui-org/react';
import {
  Calendar,
  Clock,
  Tag,
  Edit,
  Trash,
  ArrowLeft,
  Share
} from 'lucide-react';
import { apiService, Post } from '../services/apiService';
import defaultAvatar from '../assets/aadi.jpg';
import FacebookComments from '../components/FacebookComments';

interface PostPageProps {
  isAuthenticated?: boolean;
}

const PostPage: React.FC<PostPageProps> = ({
  isAuthenticated
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  //const fullUrl = `http://localhost:5173${location.pathname}`;    //Your domain name
  const fullUrl = `${window.location.origin}${location.pathname}`;


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Post ID is required');
        const fetchedPost = await apiService.getPost(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setIsDeleting(true);
      await apiService.deletePost(post.id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete the post. Please try again later.');
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  DOMPurify.addHook('uponSanitizeAttribute', (_, data) => {
    if (data.attrName === 'style') {
      const allowedStyles = ['color', 'background', 'border', 'padding', 'border-radius'];
      const sanitizedStyles = data.attrValue
        .split(';')
        .map(style => {
          const [prop, value] = style.split(':').map(s => s.trim());
          if (allowedStyles.includes(prop)) {
            return `${prop}: ${value}`;
          }
          return '';
        })
        .filter(Boolean)
        .join('; ');

      data.attrValue = sanitizedStyles;
    }
  });


  const createSanitizedHTML = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          'p', 'strong', 'em', 'br', 'ul', 'li', 'ol', 'a', 'blockquote',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'span', 'img', 'hr', 'div'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'data-box', 'src'],
        //ALLOWED_CSS_PROPERTIES: ['color', 'border', 'padding', 'background', 'border-radius']
      }),
    };
  };




  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card className="w-full animate-pulse">
          <CardBody>
            <div className="h-8 bg-default-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-default-200 rounded w-full"></div>
              <div className="h-4 bg-default-200 rounded w-full"></div>
              <div className="h-4 bg-default-200 rounded w-2/3"></div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardBody>
            <p className="text-danger">{error || 'Post not found'}</p>
            <Button
              as={Link}
              to="/"
              color="primary"
              variant="flat"
              startContent={<ArrowLeft size={16} />}
              className="mt-4"
            >
              Back to Home
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card className="w-full shadow-lg border border-default-200 dark:border-default-100 rounded-2xl">
        <CardHeader className="flex flex-col items-start gap-5 bg-gradient-to-tr from-gray-950 to-gray-800 text-white px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between w-full items-center">
            <Button
              as={Link}
              to="/"
              variant="flat"
              startContent={<ArrowLeft size={16} />}
              size="sm"
              className="text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              Back to Posts
            </Button>

            <div className="flex gap-2">
              {isAuthenticated && (
                <>
                  <Button
                    as={Link}
                    to={`/posts/${post.id}/edit`}
                    color="primary"
                    variant="flat"
                    startContent={<Edit size={16} />}
                    size="sm"
                    className='text-blue-400'
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    startContent={<Trash size={16} />}
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    size="sm"
                    className='text-red-400'
                  >
                    Delete
                  </Button>
                </>
              )}
              <Button
                variant="flat"
                startContent={<Share size={16} />}
                onClick={handleShare}
                size="sm"
                className='text-yellow-400'
              >
                Share
              </Button>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Avatar
                name={post.author?.name}
                size="sm"
                className="text-blue-900"
                src={defaultAvatar}
              />
              <span className="font-medium">{post.author?.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </CardHeader>

        <Divider />

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
            alt="Post Banner"
            className="w-full max-h-[400px] object-cover"
          />
        )}

        <CardBody className="prose dark:prose-invert max-w-none text-base leading-relaxed px-6 py-8">
          <div
            dangerouslySetInnerHTML={createSanitizedHTML(post.content)}
          />
        </CardBody>


        <CardFooter className="flex flex-col items-start gap-4 px-6 py-4">
          <Divider />
          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat">
              {post.category.name}
            </Chip>
            {post.tags.map((tag) => (
              <Chip
                key={tag.id}
                variant="flat"
                startContent={<Tag size={14} />}
                className="bg-default-100"
              >
                {tag.name}
              </Chip>
            ))}
          </div>

          {/* 🔥 Facebook Comments Plugin */}
          <FacebookComments url={fullUrl} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostPage;
