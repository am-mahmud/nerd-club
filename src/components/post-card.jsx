"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
import { useState } from "react";

export function PostCard({ post }) {
 

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-base">{post.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 pb-6">{post.description}</p>

        <div className="flex items-center gap-4">

    
          <button
            disabled={loading}
            // onClick={handleUpvote}
            // className={`cursor-pointer transition ${
            //   userVote === 1 ? "text-blue-600" : "text-gray-500"
            // }`}
          >
            <ArrowBigUp />
          </button>

        
          <span className="text-sm font-medium">{votes}</span>

    
          <button
            disabled={loading}
            // onClick={handleDownvote}
            // className={`cursor-pointer transition ${
            //   userVote === -1 ? "text-red-600" : "text-gray-500"
            // }`}
          >
            <ArrowBigDown />
          </button>

          <MessageCircle />
        </div>
      </CardContent>
    </Card>
  );
}
