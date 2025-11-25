import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import EditPostClient from "./EditPostClient";

export default async function EditPostPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <EditPostClient />;
}