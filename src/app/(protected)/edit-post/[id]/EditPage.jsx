'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPost({ id, title, description }) {

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          placeholder="Post title..."
        />

        <Textarea
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="h-40"
          placeholder="Post content..."
        />

        <Button type="submit">
          Update Post
        </Button>
      </form>
    </div>
  );
}
