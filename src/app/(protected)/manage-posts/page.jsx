import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ManagePosts() {
    const posts = [
        { id: 1, title: "First Post", date: "2024-01-01" },
    ];

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
                    {posts.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>{p.title}</TableCell>
                            <TableCell>{p.date}</TableCell>
                            <TableCell>
                                <Link href={`/edit-post/${p.id}`}>
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
