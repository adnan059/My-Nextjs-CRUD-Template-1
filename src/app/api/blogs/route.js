import { Blog } from "@/models/models";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(request, {}) {
  const { searchParams } = new URL(request.url);
  try {
    await connectDB();

    const status = searchParams.get("status");
    const blogs = await Blog.find({ status });

    return NextResponse.json({ data: blogs }, { status: 200 });
  } catch (error) {
    throw NextResponse.json(
      {
        message: error?.message || "failed to fetch the blog posts",
      },
      { status: 500 }
    );
  }
}
