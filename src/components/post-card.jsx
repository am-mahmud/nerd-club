// "use client";

// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
// import { useState } from "react";

// export function PostCard({ post }) {

//     const [votes, setVotes] = useState(post.votes || 0);
//     const [userVote, setUserVote] = useState(0);

//      const sendVote = async (type) => {
//         try {
//             await fetch(`http://localhost:3001/api/post/${post._id}/vote`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ voteType: type }),
//             });
//         } catch (err) {
//             console.error("Vote API error:", err);
//         }
//     };

//      const handleUpvote = async () => {
//         setVotes(prev => {
//             if (userVote === 1) {
//                 setUserVote(0);
//                 sendVote("remove");
//                 return prev - 1;
//             }

//             if (userVote === -1) {
//                 setUserVote(1);
//                 sendVote("switchToUp");
//                 return prev + 2;
//             }

//             setUserVote(1);
//             sendVote("up");
//             return prev + 1;
//         });
//     };

//      const handleDownvote = async () => {
//         setVotes(prev => {
//             if (userVote === -1) {
//                 setUserVote(0);
//                 sendVote("remove");
//                 return prev + 1;
//             }

//             if (userVote === 1) {
//                 setUserVote(-1);
//                 sendVote("switchToDown");
//                 return prev - 2;
//             }

//             setUserVote(-1);
//             sendVote("down");
//             return prev - 1;
//         });
//     };

//     return (
//         <Card className="hover:shadow-md transition">
//             <CardHeader>
//                 <h2 className="font-bold text-base">{post.title}</h2>
//             </CardHeader>

//             <CardContent>
//                 <p className="text-sm text-gray-600 pb-6">{post.description}</p>

//                 <div className="flex gap-4 items-center">

//                     <button
//                         onClick={handleUpvote}
//                         className={`flex items-center gap-1 cursor-pointer transition ${userVote === 1 ? "text-blue-600" : "text-gray-500"
//                             }`}
//                     >
//                         <ArrowBigUp />
//                     </button>


                  
//                     <span className="text-sm font-medium">{votes}</span>

                  
//                     <button
//                         onClick={handleDownvote}
//                         className={`flex items-center gap-1 cursor-pointer transition ${userVote === -1 ? "text-red-600" : "text-gray-500"
//                             }`}
//                     >
//                         <ArrowBigDown />
//                     </button>

//                     <MessageCircle />
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }



"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export function PostCard({ post: initialPost }) {
  const { data: session } = useSession();
  const [votes, setVotes] = useState(initialPost.votes || 0);
  const [userVote, setUserVote] = useState(initialPost.userVote || 0); // optional initial value

  // Optionally, you can fetch user's vote on mount if initialPost didn't include it
  useEffect(() => {
    setVotes(initialPost.votes || 0);
    // if backend returned user-specific vote, set it:
    if (typeof initialPost.userVote !== "undefined") setUserVote(initialPost.userVote);
  }, [initialPost]);

  const sendVote = async (type) => {
    if (!session) {
      // prompt login
      signIn(); // redirect to sign in page
      return;
    }

    try {
      const res = await fetch(`/api/posts/${initialPost._id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType: type })
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Vote failed:", data);
        return;
      }

      // backend authoritative values
      setVotes(data.votes);
      setUserVote(data.userVote);
    } catch (err) {
      console.error("Vote API error:", err);
    }
  };

  const handleUpvote = () => {
    // local optimisitic UI could be used, but we rely on backend response for correctness
    if (userVote === 1) sendVote("remove");
    else sendVote("up");
  };

  const handleDownvote = () => {
    if (userVote === -1) sendVote("remove");
    else sendVote("down");
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-base">{initialPost.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 pb-6">{initialPost.description}</p>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1 cursor-pointer transition ${userVote === 1 ? "text-blue-600" : "text-gray-500"}`}
            aria-label="upvote"
          >
            <ArrowBigUp />
          </button>

          <span className="text-sm font-medium">{votes}</span>

          <button
            onClick={handleDownvote}
            className={`flex items-center gap-1 cursor-pointer transition ${userVote === -1 ? "text-red-600" : "text-gray-500"}`}
            aria-label="downvote"
          >
            <ArrowBigDown />
          </button>

          <MessageCircle />
        </div>
      </CardContent>
    </Card>
  );
}
