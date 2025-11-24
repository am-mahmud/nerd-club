import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {

     const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: 'no-store',
      });

      const data = await res.json();
      return data.posts;
    } catch (error) {
      console.log("Error fetching posts:", error);
      return [];
    }
  };

    const posts = await getPosts();

    return (

        <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
            <div className="grid grid-cols-3 gap-6 mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>42</CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Views</CardTitle>
                    </CardHeader>
                    <CardContent>10,400</CardContent>
                </Card> 

                 <Card>
                    <CardHeader>
                        <CardTitle>Comments</CardTitle>
                    </CardHeader>
                    <CardContent>315</CardContent>
                </Card>
            </div>

        </div>

    );
}
