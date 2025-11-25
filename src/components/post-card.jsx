"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export function PostCard({ post }) {
  const [votes, setVotes] = useState(post.votes || 0);
  const [userVote, setUserVote] = useState(post.userVote || 0); // initial from server
  const [loading, setLoading] = useState(false);

  // Safe vote API call
 async function sendVote(id, type) {
  try {
    const res = await fetch(`/api/posts/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Vote failed");

    return data.votes;
  } catch (err) {
    console.error("Vote failed:", err.message);
  }
}


  // Click handlers
  const handleUpvote = async () => {
    if (loading) return;
    setLoading(true);

    const type =
      userVote === 1 ? "remove"
      : userVote === -1 ? "up"
      : "up";

    const res = await sendVote(type);

    if (res) {
      setVotes(res.votes);
      setUserVote(res.userVote);
    }

    setLoading(false);
  };

  const handleDownvote = async () => {
    if (loading) return;
    setLoading(true);

    const type =
      userVote === -1 ? "remove"
      : userVote === 1 ? "down"
      : "down";

    const res = await sendVote(type);

    if (res) {
      setVotes(res.votes);
      setUserVote(res.userVote);
    }

    setLoading(false);
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-base">{post.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 pb-6">{post.description}</p>

        <div className="flex items-center gap-4">

          {/* UPVOTE */}
          <button
            disabled={loading}
            onClick={handleUpvote}
            className={`cursor-pointer transition ${
              userVote === 1 ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <ArrowBigUp />
          </button>

          {/* VOTE COUNT */}
          <span className="text-sm font-medium">{votes}</span>

          {/* DOWNVOTE */}
          <button
            disabled={loading}
            onClick={handleDownvote}
            className={`cursor-pointer transition ${
              userVote === -1 ? "text-red-600" : "text-gray-500"
            }`}
          >
            <ArrowBigDown />
          </button>

          <MessageCircle />
        </div>
      </CardContent>
    </Card>
  );
}
