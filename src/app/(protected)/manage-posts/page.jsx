"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const getPosts = async () => {
    try {
      const res = await fetch(`/api/posts?userOnly=true`, { 
        cache: "no-store" 
      });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      getPosts();
    }
  }, [session]);

  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (data.success) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (error) {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
        <p>Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">Manage Your Posts</h1>
        </div>
        <Link href="/add-post">
          <Button>Add New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
          <Link href="/add-post">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table className="min-w-[600px] w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/edit-post/${post._id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>

                      <Button
                        onClick={() => deletePost(post._id)}
                        size="sm"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}