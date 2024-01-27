export function getUpdatedBlog(formData, blog) {
    const updatedBlog = {
        ...(formData.topic !== blog.topic && { topic: formData.topic }),
        ...(formData.subTopic !== blog.subTopic && { subTopic: formData.subTopic }),
        ...(formData.tags.length > 0 && !arraysEqual(formData.tags, blog.tags) && { tags: formData.tags }),
        ...(formData.description !== blog.description && { description: formData.description }),
    };

    return updatedBlog;
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

