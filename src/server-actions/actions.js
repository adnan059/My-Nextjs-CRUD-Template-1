"use server";

import { Blog } from "@/models/models";
import { revalidatePath } from "next/cache";

export const deleteBlog = async (id) => {
  console.log("delete req hit");
  try {
    await Blog.findByIdAndDelete(id);
    revalidatePath("/blogs");
    revalidatePath("/draft");
    return { message: "blog deleted", status: 200 };
  } catch (error) {
    throw new Error(error?.message || "failed to delete the post");
  }
};
