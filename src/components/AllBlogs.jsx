"use client";
import React, { useEffect, useState } from "react";
import BlogsTable from "./BlogsTable";
import { useDebounce } from "use-debounce";

const AllBlogs = ({ blogs }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [searchText, setSearchText] = useState("");
  const [dbSearchText] = useDebounce(searchText, 800);

  useEffect(() => {
    const searchedBlogs =
      dbSearchText === ""
        ? blogs
        : blogs.filter((blog) => {
            if (blog.title.toLowerCase().startsWith(dbSearchText)) {
              return true;
            } else {
              return false;
            }
          });
    setFilteredBlogs(searchedBlogs);
  }, [dbSearchText]);

  return (
    <div>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        type="search"
        placeholder="Search Blog"
        className="searchBlogs"
      />

      <BlogsTable blogs={filteredBlogs} />
    </div>
  );
};

export default AllBlogs;
