import AllBlogs from "@/components/AllBlogs";
import "@/assets/styles/blogs.css";
import { baseUrl } from "@/utils/data";
import { toast } from "react-toastify";

export default async function BlogsPage() {
  const response = await fetch(`${baseUrl}/api/blogs?status=published`, {
    next: {
      revalidate: 3000,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    toast.error(error?.message || "failed to fetch the blog posts");
  }

  const { data } = await response.json();

  return (
    <div className="blogs">
      <h2>All Published Blogs</h2>
      <AllBlogs blogs={data} />
    </div>
  );
}
