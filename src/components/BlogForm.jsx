"use client";
import { useState } from "react";
import "../assets/styles/blogForm.css";
import { baseUrl } from "@/utils/data";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BlogForm = ({ type, blog }) => {
  const [blogData, setBlogData] = useState({
    title: blog?.title || "",
    desc: blog?.desc || "",
    category: blog?.category || [],
    status: blog?.status || "",
  });
  const router = useRouter();

  // handling the input change
  const handleChange = (e) => {
    if (e.target.name === "category") {
      setBlogData({
        ...blogData,
        category: Array.from(
          e.target.selectedOptions,
          (option) => option.value
        ),
      });
      return;
    }
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  // handling the submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =
        type === "create"
          ? await fetch(`${baseUrl}/api/blogs/create`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(blogData),
            })
          : await fetch(`${baseUrl}/api/blogs/${blog?._id}`, {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(blogData),
            });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "failed to create the blog post");
      }

      const resData = await response.json();

      toast.success(resData?.message);

      router.push(`${resData.data?.status === "draft" ? "/draft" : "/blogs"}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="addBlog">
      <h2>Create Your New Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* title of the blog */}
        <input
          onChange={handleChange}
          value={blogData.title}
          type="text"
          name="title"
          placeholder="Write Title"
          required
        />
        {/* description of the blog */}
        <textarea
          onChange={handleChange}
          value={blogData.desc}
          type="text"
          name="desc"
          placeholder="Write Description"
          required
        ></textarea>
        {/* category of the blog */}
        <select
          required
          value={blogData.category}
          multiple
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option disabled value="">
            Select Category
          </option>
          <option value="culture">Culture</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        {/* status of the blog */}
        <select
          required
          onChange={handleChange}
          value={blogData.status}
          name="status"
          id="status"
        >
          <option disabled value="">
            Select Status
          </option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {/* create button */}
        <button className="actionBtn">{type}</button>
      </form>
    </div>
  );
};

export default BlogForm;
