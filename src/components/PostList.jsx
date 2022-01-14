import { useState, useEffect, useRef, Fragment } from "react";
import { useFetchPost, useFetchUser } from "hooks";
import { Link } from "react-router-dom";

export function PostList() {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);
  const { data: user } = useFetchUser();
  console.log("🚀 ~ file: PostList.jsx ~ line 8 ~ PostList ~ user", user);

  const { data: post, error, isLoading } = useFetchPost({ page, limit });

  const handleLoadMore = () => {
    setLimit(limit + 94);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col py-8 space-y-3 lg:px-8">
      <p className="font-bold font-primary text-base text-left md:text-lg">
        Latest Post
      </p>

      <div className="space-y-2">
        {post.map((item, idx) => (
          <Link
            className="bg-white duration-200 flex flex-col p-3 rounded-lg shadow-lg space-y-4 transition-colors hover:bg-gray-200 cursor-pointer"
            key={item.id}
            to={`/post/${item.id}`}
          >
            <div className="flex flex-col items-center bg-emerald-500">
              <div className="flex flex-row w-max  px-2 py-1 rounded-md">
                <p className="font-bold font-primary text-gray-800 text-xs md:text-sm  text-center">
                  {item.title}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-bold font-primary text-gray-800 text-xs md:text-sm">
                User :{" "}
                <span className="p-1 bg-red-300">
                  {user[item?.userId - 1].name}
                </span>
              </p>
              <p className="font-bold font-primary text-gray-800 text-xs md:text-sm">
                Company:{" "}
                <span className="p-1 bg-blue-300">
                  {user[item.userId - 1].company.name}
                </span>
              </p>
            </div>
            <p className="text-gray-600 text-xs md:text-sm">{item.body}</p>
          </Link>
        ))}
        <button className="btn btn-block btn-info" onClick={handleLoadMore}>
          Load All News
        </button>
      </div>
    </div>
  );
}
