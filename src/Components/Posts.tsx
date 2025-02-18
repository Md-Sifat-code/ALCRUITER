import React from "react";

const Posts: React.FC = () => {
  const posts = [
    {
      title: "React 18 Released",
      description:
        "React 18 introduces new features like Suspense and concurrent rendering.",
      image: "/post-1.png",
    },
    {
      title: "Understanding TypeScript",
      description:
        "A beginner's guide to TypeScript, covering basic concepts and use cases.",
      image: "/post2.png",
    },
    {
      title: "JavaScript ES2023 Features",
      description:
        "Explore the new features and enhancements coming to JavaScript in ES2023.",
      image: "/post-3.png",
    },
  ];

  return (
    <section className=" mt-4">
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="max-w-xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
