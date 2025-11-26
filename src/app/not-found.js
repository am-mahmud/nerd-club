export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gray-950 text-gray-200">
      <h1 className="text-8xl font-extrabold bg-linear-to-r from-fuchsia-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-md">
        404
      </h1>

      <p className="mt-4 text-xl text-gray-400">
        Oops… The page you're looking for doesn’t exist.
      </p>

      <a
        href="/"
        className="mt-8 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg hover:scale-105 transition-transform"
      >
        Go Home
      </a>
    </div>
  );
}
