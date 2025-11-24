import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ManagePosts() {
   
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
            <h1 className="text-xl font-semibold mb-4">Manage Posts</h1>

            <Table className="table-fixed w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post._id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.date}</TableCell>
                            <TableCell>
                                <Link href={`/edit-post/${post._id}`}>
                                    <Button size="sm" variant="outline">Edit</Button>
                                </Link>
                                <Button size="sm" variant="destructive" className="ml-2">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
