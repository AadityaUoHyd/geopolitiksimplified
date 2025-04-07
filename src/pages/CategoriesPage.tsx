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
  Tooltip,
} from "@nextui-org/react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { apiService, Category } from "../services/apiService";

interface CategoriesPageProps {
  isAuthenticated: boolean;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ isAuthenticated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories();
      setCategories(response);
      setError(null);
    } catch (err) {
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingCategory) {
        await apiService.updateCategory(
          editingCategory.id,
          newCategoryName.trim()
        );
      } else {
        await apiService.createCategory(newCategoryName.trim());
      }
      await fetchCategories();
      handleModalClose();
    } catch (err) {
      setError(
        `Failed to ${
          editingCategory ? "update" : "create"
        } category. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the category "${category.name}"?`
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await apiService.deleteCategory(category.id);
      await fetchCategories();
    } catch (err) {
      setError("Failed to delete category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    onClose();
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    onOpen();
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setNewCategoryName("");
    onOpen();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
  <Card className="shadow-xl rounded-2xl">
    <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800">📁 Categories</h1>
      {isAuthenticated && (
        <Button
          color="primary"
          startContent={<Plus size={16} />}
          onClick={openAddModal}
          className="rounded-lg shadow-sm"
        >
          Add Category
        </Button>
      )}
    </CardHeader>

    <CardBody className="px-6 py-4 space-y-4">
      {error && (
        <div className="p-4 text-red-600 bg-red-100 rounded-xl font-medium shadow-sm">
          {error}
        </div>
      )}

      <Table
        aria-label="Categories table"
        removeWrapper
        isHeaderSticky
        classNames={{
          wrapper: "max-h-[500px] shadow-md rounded-xl overflow-hidden",
          th: "bg-gray-50 text-gray-700 font-semibold text-sm uppercase",
          td: "text-base text-gray-800",
        }}
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>POST COUNT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<div className="py-4 px-2">Loading categories...</div>}
        >
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.postCount || 0}</TableCell>
              <TableCell>
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <Tooltip content="Edit category">
                      <Button
                        isIconOnly
                        variant="flat"
                        size="sm"
                        onClick={() => openEditModal(category)}
                        className="text-blue-500 hover:bg-blue-100"
                      >
                        <Edit2 size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      content={
                        category.postCount
                          ? "Cannot delete category with existing posts"
                          : "Delete category"
                      }
                    >
                      <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(category)}
                        isDisabled={category?.postCount
                          ? category.postCount > 0
                          : false}
                        className="hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardBody>
  </Card>

  {/* Modal */}
  <Modal isOpen={isOpen} onClose={handleModalClose} placement="center" size="md">
    <ModalContent className="rounded-xl shadow-2xl">
      <ModalHeader className="text-xl font-semibold">
        {editingCategory ? "Edit Category" : "Add Category"}
      </ModalHeader>
      <ModalBody>
        <Input
          label="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          isRequired
          className="w-full"
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="flat" onClick={handleModalClose} className="rounded-lg">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={handleAddEdit}
          isLoading={isSubmitting}
          className="rounded-lg"
        >
          {editingCategory ? "Update" : "Add"}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</div>
  );
};

export default CategoriesPage;
