import EditPost from "./EditPage";

const getPostById = async (id) => {
  try {
    const res = await fetch(`/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Page({ params }) {
  const { id } = params;
  const data = await getPostById(id);

  return (
    <EditPost
      id={id}
      title={data.post.title}
      description={data.post.description}
    />
  );
}
