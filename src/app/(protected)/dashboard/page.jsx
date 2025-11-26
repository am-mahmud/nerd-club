import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongo";
import Post from "@/models/Post";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const getPosts = async () => {
    try {
      await dbConnect();
      
      const posts = await Post.find({ authorEmail: session.user.email })
        .sort({ createdAt: -1 })
        .lean()
        .exec();
      
      const total = await Post.countDocuments({ authorEmail: session.user.email });

      const serializedPosts = posts.map(post => ({
        ...post,
        _id: post._id.toString(),
        createdAt: post.createdAt?.toISOString() || null,
        updatedAt: post.updatedAt?.toISOString() || null,
      }));

      return {
        totalPosts: total,
        posts: serializedPosts.slice(0, 4)
      };

    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      return { totalPosts: 0, posts: [] };
    }
  };

  const { totalPosts, posts } = await getPosts();

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-6 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session.user?.name || 'User'}!
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">My Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPosts}</p>
            <p className="text-sm text-gray-500 mt-1">Posts you created</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Coming Soon</p>
            <p className="text-sm text-gray-500 mt-1">Total views on your posts</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Coming Soon</p>
            <p className="text-sm text-gray-500 mt-1">Comments on your posts</p>
          </CardContent>
        </Card>
      </div>

    
      {posts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Your Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Card key={post._id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                  {post.createdAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && totalPosts === 0 && (
        <div className="mt-12 text-center py-12 border rounded-lg">
          <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
          <a 
            href="/add-post"
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Create Your First Post
          </a>
        </div>
      )}
    </div>
  );
}