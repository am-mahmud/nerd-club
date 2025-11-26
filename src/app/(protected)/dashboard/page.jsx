import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {


   const getPosts = async () => {
    try {
      const apiUrl = "NEXTAUTH_URL/api/posts";

      const res = await fetch(apiUrl, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("API ERROR:", res.status, res.statusText);
        return { totalPosts: 0 };
      }

      const data = await res.json();

      return {
        totalPosts: data?.totalPosts ?? 0,
      };

    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      return { totalPosts: 0 };
    }
  };

  const { totalPosts } = await getPosts();

  return (
    <div className="mx-auto max-w-6xl min-h-screen px-6 pt-24">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalPosts}</p>
            <p className="text-sm text-gray-500 mt-1">All posts created</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Coming Soon</p>
            <p className="text-sm text-gray-500 mt-1">Total page views</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-gray-600">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Coming Soon</p>
            <p className="text-sm text-gray-500 mt-1">All user comments</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
