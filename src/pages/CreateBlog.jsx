import Loader from "../components/Loader";
import BlogForm from "../components/BlogForm";
import useBlogForm from "../hooks/useBlogForm";

function CreateBlog() {
  const mode = "create";
  const {
    formData,
    imageError,
    formError,
    formLoading,
    setFormData,
    handleTagChange,
    handleCustomTagInputChange,
    handleAddCustomTag,
    handleDeleteTag,
    handleImageChange,
    handleCreateBlog,
  } = useBlogForm(
    {
      topic: "",
      subTopic: "",
      blogImage: "",
      tags: [],
      customTagsInput: "",
      description: "",
    },
    mode
  );

  if (formLoading) {
    return <Loader />;
  }

  return (
    <BlogForm
      formData={formData}
      setFormData={setFormData}
      imageError={imageError}
      formError={formError}
      handleTagChange={handleTagChange}
      handleCustomTagInputChange={handleCustomTagInputChange}
      handleAddCustomTag={handleAddCustomTag}
      handleDeleteTag={handleDeleteTag}
      handleImageChange={handleImageChange}
      handleSaveBlog={handleCreateBlog}
    />
  );
}

export default CreateBlog;
