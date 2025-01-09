import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = (props) => {
  const navigate = useNavigate();
  const handleDescription = () => {
    navigate("/description", {
      state: {
        title: props.title,
        content: props.content,
        imgUrl: props.imgUrl,
      },
    });
  };
  return (
    <div className="w-full max-lg:max-w-xl lg:w-[30%] border border-gray-300 rounded-2xl">
      <div className="flex items-center">
        <img
          src={props.imgUrl}
          className="rounded-t-2xl w-full object-fill h-[300px]"
        />
      </div>
      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-[#d7d7ed]">
        <span className="text-indigo-600 font-medium mb-3 block">
          {new Date().toDateString()}
        </span>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
          {props.title}
        </h4>
        <p className="text-gray-500 line-clamp-2 leading-6 mb-10">
          {props.content}
        </p>
        <button
          onClick={handleDescription}
          className="cursor-pointer text-lg text-indigo-600 font-semibold"
        >
          Read more..
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
