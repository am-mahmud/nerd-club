import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AddPostClient from "./AddPostClient";


export default async function EditPostPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <AddPostClient />;
}