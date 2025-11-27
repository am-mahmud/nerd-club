export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl min-h-screen px-12 pt-24">
      <title>Post Not Found</title>
      <div className="border border-cyan-200 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-cyan-800 mb-2">
          Post Not Found
        </h1>
        <p className="text-cyan-600">
          The post you're looking for doesn't exist or has been deleted.
        </p>
        <a 
          href="/manage-posts" 
          className="inline-block mt-4 text-cyan-600"
        >
          Back to Manage Posts
        </a>
      </div>
    </div>
  );
}