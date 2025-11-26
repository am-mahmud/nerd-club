// "use client";

// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
// import { useState } from "react";

// export function PostCard({ post }) {
 

//   return (
//     <Card className="hover:shadow-md transition">
//       <CardHeader>
//         <h2 className="font-bold text-base">{post.title}</h2>
//       </CardHeader>

//       <CardContent>
//         <p className="text-sm text-gray-600 pb-6">{post.description}</p>

//         <div className="flex items-center gap-4">

    
//           <button
//             // disabled={loading}
//             // onClick={handleUpvote}
//             // className={`cursor-pointer transition ${
//             //   userVote === 1 ? "text-blue-600" : "text-gray-500"
//             // }`}
//           >
//             <ArrowBigUp />
//           </button>

        
//           {/* <span className="text-sm font-medium">{votes}</span> */}

    
//           <button
//             // disabled={loading}
//             // onClick={handleDownvote}
//             // className={`cursor-pointer transition ${
//             //   userVote === -1 ? "text-red-600" : "text-gray-500"
//             // }`}
//           >
//             <ArrowBigDown />
//           </button>

//           <MessageCircle />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function PostCard({ post }) {
  const { data: session } = useSession();

  const userId = session?.user?._id; // your NextAuth user id
  const [votes, setVotes] = useState(post.voteCount);
  const [userVote, setUserVote] = useState(
    post.upvoters.includes(userId) ? 1 :
    post.downvoters.includes(userId) ? -1 :
    0
  );
  const [loading, setLoading] = useState(false);

  async function sendVote(voteType) {
    if (!userId) return alert("You must be logged in!");

    setLoading(true);

    const res = await fetch("/api/posts/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: post._id,
        userId,
        voteType, // "up", "down" or ""
      }),
    });

    const data = await res.json();
    if (data?.post) {
      setVotes(data.post.voteCount);

      // update UI based on server logic
      if (voteType === "up") setUserVote(1);
      else if (voteType === "down") setUserVote(-1);
      else setUserVote(0); 
    }

    setLoading(false);
  }

  const handleUpvote = () => {
    if (userVote === 1) sendVote(""); // remove vote
    else sendVote("up");
  };

  const handleDownvote = () => {
    if (userVote === -1) sendVote(""); // remove vote
    else sendVote("down");
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-base">{post.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 pb-6">{post.description}</p>

        <div className="flex items-center gap-4">

          {/* UPVOTE BUTTON */}
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

          {/* DOWNVOTE BUTTON */}
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
