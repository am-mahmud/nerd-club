"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

export default function AddPost() {
  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Create New Post</h1>

      <div className="space-y-4">
        <Input placeholder="Post title" />
        {/* <Textarea placeholder="Post content..." className="h-40"/> */}
        <Button>Create Post</Button>
      </div>
    </div>
  );
}
