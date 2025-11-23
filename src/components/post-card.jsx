import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function PostCard({ post }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <h2 className="font-bold text-lg">{post.title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
    </Card>
  );
}
