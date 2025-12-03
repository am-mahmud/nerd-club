// "use client";

// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { CheckCircle2Icon } from "lucide-react";

// export function PostCard({ post }) {
//   const { data: session } = useSession();


//   const userId = session?.user?.id;


//   const upvoters = post.upvoters || [];
//   const downvoters = post.downvoters || [];

//   const [votes, setVotes] = useState(post.voteCount || 0);

//   const [userVote, setUserVote] = useState(
//     upvoters.includes(userId) ? 1 :
//       downvoters.includes(userId) ? -1 :
//         0
//   );

//   const [loading, setLoading] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   async function sendVote(voteType) {
//     if (!userId) {
//       setShowAlert(true);
//       return;
//     }
//     setLoading(true);

//     const res = await fetch("/api/posts/vote", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ postId: post._id, userId, voteType }),
//     });

//     const data = await res.json();

//     if (data?.post) {
//       setVotes(data.post.voteCount);

//       if (voteType === "up") setUserVote(1);
//       else if (voteType === "down") setUserVote(-1);
//       else setUserVote(0);
//     }

//     setLoading(false);
//   }

//   const handleUpvote = () => {
//     if (userVote === 1) sendVote("");
//     else sendVote("up");
//   };

//   const handleDownvote = () => {
//     if (userVote === -1) sendVote("");
//     else sendVote("down");
//   };

//   return (
//     <>

//       {showAlert && (
//         <Alert className="mb-4 text-cyan-700">
//           <CheckCircle2Icon className="h-4 w-4" />
//           <AlertTitle>You must be logged in!</AlertTitle>
//           <AlertDescription>
//             Please sign in to upvote or downvote posts.
//           </AlertDescription>
//         </Alert>
//       )}

//       <Card className="hover:shadow-md transition max-w-full overflow-hidden">
//         <CardHeader>
//           <h2 className="font-bold text-base truncate">{post.title}</h2>
//         </CardHeader>

//         <CardContent>
//           <p className="text-sm text-gray-600 pb-6 wrap-break-word line-clamp-3">{post.description}</p>

//           <div className="flex items-center gap-4">


//             <button
//               disabled={loading}
//               onClick={handleUpvote}
//               className={`cursor-pointer transition ${userVote === 1 ? "text-blue-600" : "text-gray-500"
//                 }`}
//             >
//               <ArrowBigUp />
//             </button>

//             <span className="text-sm font-medium">{votes}</span>


//             <button
//               disabled={loading}
//               onClick={handleDownvote}
//               className={`cursor-pointer transition ${userVote === -1 ? "text-red-600" : "text-gray-500"
//                 }`}
//             >
//               <ArrowBigDown />
//             </button>

//             <MessageCircle />
//           </div>
//         </CardContent>
//       </Card>

//     </>

//   );
// }


"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigUp, ArrowBigDown, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react";

export function PostCard({ post }) {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const upvoters = post.upvoters || [];
  const downvoters = post.downvoters || [];

  const [votes, setVotes] = useState(post.voteCount || 0);

  const [userVote, setUserVote] = useState(
    upvoters.includes(userId) ? 1 :
      downvoters.includes(userId) ? -1 :
        0
  );

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  async function sendVote(voteType) {
    if (!userId) {
      setShowAlert(true);
      return;
    }
    setLoading(true);

    const res = await fetch("/api/posts/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post._id, userId, voteType }),
    });

    const data = await res.json();

    if (data?.post) {
      setVotes(data.post.voteCount);

      if (voteType === "up") setUserVote(1);
      else if (voteType === "down") setUserVote(-1);
      else setUserVote(0);
    }

    setLoading(false);
  }

  const handleUpvote = () => {
    if (userVote === 1) sendVote("");
    else sendVote("up");
  };

  const handleDownvote = () => {
    if (userVote === -1) sendVote("");
    else sendVote("down");
  };

  return (
    <>
      {showAlert && (
        <Alert className="mb-4 text-cyan-700">
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle>You must be logged in!</AlertTitle>
          <AlertDescription>
            Please sign in to upvote or downvote posts.
          </AlertDescription>
        </Alert>
      )}

      <Card className="hover:shadow-md transition max-w-full overflow-hidden h-[280px] flex flex-col">
        <CardHeader className="shrink-0">
          <h2 className="font-bold text-base truncate">{post.title}</h2>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between overflow-hidden">
          <p className="text-sm text-gray-600 pb-6 wrap-break-words line-clamp-3 overflow-hidden">
            {post.description}
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <button
              disabled={loading}
              onClick={handleUpvote}
              className={`cursor-pointer transition ${
                userVote === 1 ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <ArrowBigUp />
            </button>

            <span className="text-sm font-medium">{votes}</span>

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
    </>
  );
}