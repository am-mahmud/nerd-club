import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";

export function PostCard({ post }) {
    return (
        <Card className="hover:shadow-md transition">
            <CardHeader>
                <h2 className="font-bold text-lg">{post.title}</h2>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 pb-6">
                    {post.excerpt}
                </p>
                <div className="flex gap-3 items-center">
                    <ArrowBigUp />
                    <ArrowBigDown />
                    <MessageCircle />
                </div>

            </CardContent>

        </Card>
    );
}
