import EditPost from "./EditPage";
import { notFound } from "next/navigation";

const getPostById = async (id) => {
  const base = process.env.NEXTAUTH_URL;
  
  try {
    const res = await fetch(`${base}/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; 
      }
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.success || !data.post) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; 
  }
};

export default async function Page({ params }) {
  const { id } = await params;
  
  try {
    const data = await getPostById(id);
    
 
    if (!data || !data.post) {
      notFound();
    }

    return (
      <EditPost
        id={id}
        title={data.post.title}
        description={data.post.description}
      />
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
        <title>Error Loading Post</title>
        <div className="border border-cyan-200 rounded-lg p-6">
          <h1 className="text-xl font-semibold text-cyan-800 mb-2">
            Error Loading Post
          </h1>
          <p className="text-cyan-600">
            Failed to load the post. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}