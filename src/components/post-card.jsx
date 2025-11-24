"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { useState } from "react";

export function PostCard({ post }) {

    const [votes, setVotes] = useState(post.votes || 0);
    const [userVote, setUserVote] = useState(0);
    // 0 = no vote, 1 = upvoted, -1 = downvoted

     const sendVote = async (type) => {
        try {
            await fetch(`http://localhost:3001/api/post/${post._id}/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteType: type }),
            });
        } catch (err) {
            console.error("Vote API error:", err);
        }
    };

     const handleUpvote = async () => {
        setVotes(prev => {
            if (userVote === 1) {
                setUserVote(0);
                sendVote("remove");
                return prev - 1;
            }

            if (userVote === -1) {
                setUserVote(1);
                sendVote("switchToUp");
                return prev + 2;
            }

            setUserVote(1);
            sendVote("up");
            return prev + 1;
        });
    };

     const handleDownvote = async () => {
        setVotes(prev => {
            if (userVote === -1) {
                setUserVote(0);
                sendVote("remove");
                return prev + 1;
            }

            if (userVote === 1) {
                setUserVote(-1);
                sendVote("switchToDown");
                return prev - 2;
            }

            setUserVote(-1);
            sendVote("down");
            return prev - 1;
        });
    };

    return (
        <Card className="hover:shadow-md transition">
            <CardHeader>
                <h2 className="font-bold text-base">{post.title}</h2>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-gray-600 pb-6">{post.description}</p>

                <div className="flex gap-4 items-center">
                    {/* UPVOTE */}
                    <button
                        onClick={handleUpvote}
                        className={`flex items-center gap-1 cursor-pointer transition ${userVote === 1 ? "text-blue-600" : "text-gray-500"
                            }`}
                    >
                        <ArrowBigUp />
                    </button>


                    {/* VOTE COUNT */}
                    <span className="text-sm font-medium">{votes}</span>

                    {/* DOWNVOTE */}
                    <button
                        onClick={handleDownvote}
                        className={`flex items-center gap-1 cursor-pointer transition ${userVote === -1 ? "text-red-600" : "text-gray-500"
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
