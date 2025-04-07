import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { apiService, Post } from "../services/apiService";
import PostList from "../components/PostList";

const DraftsPage: React.FC = () => {
  const [drafts, setDrafts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt,desc");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getDrafts({
          page: page - 1,
          size: 10,
          sort: sortBy,
        });
        setDrafts(response);
        setError(null);
      } catch (err) {
        setError("Failed to load drafts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [page, sortBy]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center border-b p-4">
          <h1 className="text-2xl font-bold text-default-900">My Drafts</h1>
          <Button
            as={Link}
            to="/posts/new"
            color="primary"
            startContent={<Plus size={18} />}
            className="font-medium"
          >
            New Post
          </Button>
        </CardHeader>

        <CardBody className="p-6">
          {/* Error Alert */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {/* Draft List */}
          <PostList
            posts={drafts}
            loading={loading}
            error={error}
            page={page}
            sortBy={sortBy}
            onPageChange={setPage}
            onSortChange={setSortBy}
          />

          {/* Empty State */}
          {drafts?.length === 0 && !loading && (
            <div className="text-center mt-10 text-default-500">
              <p className="text-lg mb-4">You don't have any draft posts yet.</p>
              <Button
                as={Link}
                to="/posts/new"
                color="primary"
                variant="flat"
                className="mt-2"
              >
                Create Your First Post
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default DraftsPage;
