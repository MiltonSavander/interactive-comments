import { useState, useRef, useEffect } from "react";

const MakePost = ({ updateComments }) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    updateComments(comment);
    setComment("");
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };

  useEffect(() => {
    resizeTextarea(); // Resize on value change
  }, [comment]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 grid-rows-[auto,auto] md:flex w-full gap-4 bg-neutral-white rounded-lg p-6"
    >
      <div className="size-8 md:size-10 col-span-1 order-2 md:order-1 flex justify-center items-center">
        <img
          src="./images/avatars/image-juliusomo.png"
          alt="avatar"
        />
      </div>
      <div className="flex-1 col-span-2 order-1  ">
        <textarea
          className="w-full cursor-pointer overflow-hidden bg-neutral-white border border-neutral-grey-100 hover:border-primary-purple-600 focus:border-primary-purple-600 focus:outline-none rounded-lg p-4 resize-none text-neutral-grey-500"
          ref={textareaRef}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            resizeTextarea();
          }}
          name=""
          id=""
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex order-3 justify-self-end justify-center items-center w-22 h-10 md:w-26 md:h-12 bg-primary-purple-600 rounded-lg cursor-pointer text-neutral-white font-normal hover:opacity-65 transition-opacity duration-200 ease-in-out"
      >
        SEND
      </button>
    </form>
  );
};

export default MakePost;
