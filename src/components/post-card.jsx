"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";

export function PostCard({ post }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-base">{post.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 pb-6">{post.description}</p>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1 cursor-pointer">
            <ArrowBigUp />
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <ArrowBigDown />
          </div>

          <MessageCircle />
        </div>
      </CardContent>
    </Card>
  );
}
