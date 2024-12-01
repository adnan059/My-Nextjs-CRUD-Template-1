import { Blog } from "@/models/models";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const blog = await Blog.findById(id);

    return NextResponse.json({ data: blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "failed to fetch the blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const reqBody = await request.json();
    const response = await Blog.findByIdAndUpdate(id, reqBody, { new: true });
    revalidatePath("/blogs");
    revalidatePath("/draft");
    return NextResponse.json(
      { message: "blog updated", data: response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error?.message || "failed to updte the post" },
      { status: 500 }
    );
  }
}
