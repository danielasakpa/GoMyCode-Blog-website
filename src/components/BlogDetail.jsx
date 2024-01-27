import Loader from "../components/Loader";
import BlogForm from "../components/BlogForm";
import useBlogForm from "../hooks/useBlogForm";

function BlogDetail({ blog, id }) {
  const mode = "edit";
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
    handleUpdateBlog,
  } = useBlogForm(
    {
      topic: "",
      subTopic: "",
      blogImage: "",
      tags: [],
      customTagsInput: "",
      description: "",
    },
    mode,
    blog,
    id
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
      handleSaveBlog={handleUpdateBlog}
    />
  );
}

export default BlogDetail;
