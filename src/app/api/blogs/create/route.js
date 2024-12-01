import { Blog } from "@/models/models";
import connectDB from "@/utils/connectDB";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    await connectDB();

    const newBlog = await Blog.create(data);

    revalidatePath("/blogs");
    revalidatePath("/draft");

    return NextResponse.json(
      { message: "new blog created", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "failed to create blog" },
      { status: 500 }
    );
  }
}
