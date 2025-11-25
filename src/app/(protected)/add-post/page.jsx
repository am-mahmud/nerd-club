"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";




export default function AddPost() {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      console.log("Post created:", data);

      setTitle("");
    setDescription("");

    } catch (error) {
      console.error("Error creating post:", error);
    }

  }

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <h1 className="text-2xl font-semibold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
      
        <Input placeholder="Post title" onChange = {(e) => setTitle(e.target.value)} value={title}/>
        <Textarea placeholder="Post content..." onChange = {(e) => setDescription(e.target.value)} value={description} className="h-40"/>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}
