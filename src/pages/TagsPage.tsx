import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Plus, Trash2, X } from "lucide-react";
import { apiService, Tag } from "../services/apiService";

interface TagsPageProps {
  isAuthenticated: boolean;
}

const TagsPage: React.FC<TagsPageProps> = ({ isAuthenticated }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTags();
      setTags(response);
      setError(null);
    } catch (err) {
      setError("Failed to load tags. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTags = async () => {
    if (newTags.length === 0) return;
    try {
      setIsSubmitting(true);
      await apiService.createTags(newTags);
      await fetchTags();
      handleModalClose();
    } catch (err) {
      setError("Failed to create tags. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (tag: Tag) => {
    if (!window.confirm(`Are you sure you want to delete the tag "${tag.name}"?`)) return;
    try {
      setLoading(true);
      await apiService.deleteTag(tag.id);
      await fetchTags();
    } catch (err) {
      setError("Failed to delete tag. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setNewTags([]);
    setTagInput("");
    onClose();
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = tagInput.trim().toLowerCase();
      if (value && !newTags.includes(value)) {
        setNewTags([...newTags, value]);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput && newTags.length > 0) {
      setNewTags(newTags.slice(0, -1));
    }
  };

  const handleRemoveNewTag = (tagToRemove: string) => {
    setNewTags(newTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center border-b border-gray-200 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">📌 Tags</h1>
          {isAuthenticated && (
            <Button
              color="primary"
              startContent={<Plus size={16} />}
              onClick={onOpen}
              className="rounded-lg"
            >
              Add Tags
            </Button>
          )}
        </CardHeader>

        <CardBody className="overflow-x-auto">
          {error && (
            <div className="mb-4 p-4 text-red-600 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <Table
            aria-label="Tags table"
            isHeaderSticky
            classNames={{
              wrapper: "max-h-[600px]",
            }}
          >
            <TableHeader>
              <TableColumn className="text-left">NAME</TableColumn>
              <TableColumn className="text-left">POST COUNT</TableColumn>
              <TableColumn className="text-left">ACTIONS</TableColumn>
            </TableHeader>

            <TableBody
              isLoading={loading}
              loadingContent={<div className="text-center py-4">Loading tags...</div>}
            >
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="capitalize">{tag.name}</TableCell>
                  <TableCell>{tag.postCount || 0}</TableCell>
                  <TableCell>
                    {isAuthenticated ? (
                      <Tooltip
                        content={
                          tag.postCount
                            ? "Cannot delete tag with existing posts"
                            : "Delete tag"
                        }
                      >
                        <Button
                          isIconOnly
                          variant="flat"
                          color="danger"
                          size="sm"
                          className="rounded-md"
                          onClick={() => handleDelete(tag)}
                          isDisabled={tag?.postCount ? tag.postCount > 0 : false}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </Tooltip>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={handleModalClose} size="md">
        <ModalContent>
          <ModalHeader className="text-lg font-bold text-gray-800">Add Tags</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Tag Name"
                placeholder="Type and press Enter or comma"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                isRequired
              />
              {newTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newTags.map((tag) => (
                    <Chip
                      key={tag}
                      variant="flat"
                      className="bg-primary-100 text-primary-700"
                      endContent={
                        <button onClick={() => handleRemoveNewTag(tag)}>
                          <X size={14} />
                        </button>
                      }
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={handleModalClose} className="rounded-md">
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleAddTags}
              isLoading={isSubmitting}
              isDisabled={newTags.length === 0}
              className="rounded-md"
            >
              Add Tags
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TagsPage;
