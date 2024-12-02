"use client";
import Link from "next/link";
import "../assets/styles/blogsTable.css";
import FI from "feather-icons-react";
import { deleteBlog } from "@/server-actions/actions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const BlogsTable = ({ blogs }) => {
  const [allBlogs, setAllBlogs] = useState(blogs);

  useEffect(() => {
    setAllBlogs(blogs);
  }, [blogs]);

  const handleDelete = async (formData) => {
    if (!confirm("Do you want to delete the post?")) return;
    try {
      const _id = formData.get("_id");
      const resposne = await deleteBlog(_id);

      const updatedBlogList = allBlogs.filter((blog) => blog._id !== _id);

      setAllBlogs(updatedBlogList);

      toast.success(resposne?.message);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <table className="blogsTable">
        <thead>
          <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Edit / Delete</td>
          </tr>
        </thead>
        <tbody>
          {allBlogs?.length > 0 ? (
            <>
              {allBlogs?.map((blog, i) => (
                <tr key={blog?._id}>
                  <td>{i + 1}</td>
                  <td>{blog?.title}</td>
                  <td>{blog?.desc.slice(0, 10)}...</td>
                  <td className="viewDel">
                    <Link href={`/blogs/${blog?._id}`}>
                      <FI icon="edit" />
                    </Link>
                    <form action={handleDelete}>
                      <input type="hidden" name="_id" value={blog?._id} />
                      <button type="submit">
                        <FI fill="red" icon="trash-2" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={4}>No Blog Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable;
