import BlogForm from "@/components/BlogForm";
import { baseUrl } from "@/utils/data";
import { toast } from "react-toastify";

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  const response = await fetch(`${baseUrl}/api/blogs/${id}`);

  if (!response.ok) {
    const error = await response.json();
    toast.error(error?.message || "failed to fetch the post");
  }

  const { data } = await response.json();

  return (
    <div>
      <BlogForm type={"update"} blog={data} />
    </div>
  );
}
