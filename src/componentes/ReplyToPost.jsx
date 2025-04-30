import { useState } from "react";

const ReplyToPost = ({ setIsReplying, updateComments, username, postId, parentPostId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    updateComments(comment, username, postId, parentPostId);
    setIsReplying(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row  gap-4 bg-neutral-white rounded-lg p-6 shadow-md"
    >
      <div className="size-10 flex justify-center items-center">
        <img
          src="./images/avatars/image-juliusomo.png"
          alt="avatar"
        />
      </div>
      <div className="flex-1 h-24 ">
        <textarea
          className="w-full cursor-pointer bg-neutral-white border rounded-lg p-4 resize-none text-neutral-grey-500"
          style={{ height: "100%" }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name=""
          id=""
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex justify-center items-center w-26 h-12 bg-primary-purple-600 rounded-lg cursor-pointer text-neutral-white font-normal hover:opacity-65 transition-opacity duration-200 ease-in-out"
      >
        REPLY
      </button>
    </form>
  );
};

export default ReplyToPost;
