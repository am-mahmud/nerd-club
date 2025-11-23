"use client";

import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditPost() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <h1 className="text-2xl font-semibold mb-4">Edit Post</h1>

      <div className="space-y-4">

        <Input placeholder="Post title..." />

        <Textarea
          className="h-40"
          placeholder="Post content..."
        />

        <Button>Update</Button>
      </div>
    </div>
  );
}
