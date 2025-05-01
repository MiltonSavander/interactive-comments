import React, { useEffect } from "react";
import Likes from "./Likes";
import ReplyToPost from "./ReplyToPost";
import { useState, useRef } from "react";
import Replies from "./Replies";

const Post = ({
  postId,
  content,
  createdAt,
  score,
  user,
  username,
  replies,
  updateScore,
  updateComments,
  setIsDeleting,
  setDeleteWithID,
  editComment,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };

  useEffect(() => {
    resizeTextarea(); // Resize on value change
  }, [content, isEditing]);

  const handleDelete = (postId) => {
    setIsDeleting(true);
    setDeleteWithID(postId);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-neutral-white relative flex flex-col-reverse md:flex-row gap-6 rounded-lg p-4 md:p-6">
        <Likes
          score={score}
          postId={postId}
          updateScore={updateScore}
        />
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row items-center gap-3 md:gap-4">
            <div className="size-7 md:size-9">
              <img
                src={user.image.png}
                alt={`${user.username} avatar`}
              />
            </div>
            <div className="font-medium">{username}</div>
            {username === "juliusomo" ? (
              <div className="flex justify-center items-center bg-primary-purple-600 h-4 w-7 text-neutral-white  rounded-[2px]">
                <p className="text-[12px] mb-1">you</p>
              </div>
            ) : null}
            <div className="text-neutral-grey-500">{createdAt}</div>
          </div>
          {isEditing ? (
            <div className="flex flex-col items-end gap-4 flex-1 w-full ">
              <textarea
                className="w-full cursor-pointer bg-neutral-white border border-neutral-grey-100 hover:border-primary-purple-600 focus:border-primary-purple-600 focus:outline-none rounded-lg p-4 resize-none text-neutral-grey-500"
                style={{ overflow: "hidden" }}
                ref={textareaRef}
                value={editedContent}
                onChange={(e) => {
                  setEditedContent(e.target.value);
                  resizeTextarea();
                }}
              />
              <button
                onClick={() => {
                  editComment(postId, editedContent);
                  setIsEditing(false);
                }}
                className="flex justify-center items-center w-26 h-12 bg-primary-purple-600 rounded-lg cursor-pointer text-neutral-white font-normal hover:opacity-65 transition-opacity duration-200 ease-in-out"
              >
                UPDATE
              </button>
            </div>
          ) : (
            <div className="text-neutral-grey-500">{content}</div>
          )}
        </div>
        <div className="absolute bottom-6 right-4 md:bottom-auto md:top-6 md:right-6">
          {username === "juliusomo" ? (
            <div className=" flex flex-row items-center gap-4 md:gap-8 ">
              <button
                onClick={() => handleDelete(postId)}
                className="flex flex-row items-center gap-2 font-bold text-primary-pink-400 cursor-pointer hover:opacity-65 transition-opacity duration-200 ease-in-out"
              >
                <img
                  src="images/icon-delete.svg"
                  alt="delete icon"
                />
                <p>Delete</p>
              </button>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="flex flex-row items-center gap-2 font-bold text-primary-purple-600 cursor-pointer hover:opacity-65 transition-opacity duration-200 ease-in-out"
              >
                <img
                  src="images/icon-edit.svg"
                  alt="edit icon"
                />
                <p>Edit</p>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsReplying(true)}
              className="text-primary-purple-600  flex cursor-pointer flex-row items-center font-bold gap-2 hover:opacity-65 transition-opacity duration-200 ease-in-out"
            >
              <img
                className="w-3 h-3"
                src="images/icon-reply.svg"
                alt="reply icon"
              />
              <p>Reply</p>
            </button>
          )}
        </div>
      </div>
      {isReplying && (
        <ReplyToPost
          setIsReplying={setIsReplying}
          updateComments={updateComments}
          username={username}
          postId={postId}
        />
      )}
      {replies.length > 0 && (
        <div className="flex flex-row mt-2 ">
          <div className="flex md:justify-center pb-2 w-4 md:w-26">
            <div className="w-[2px] bg-neutral-grey-100 " />
          </div>
          <div className="flex flex-col gap-6 mb-2 w-full">
            {replies.map((reply) => (
              <Replies
                key={reply.id}
                postId={reply.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                updateScore={updateScore}
                replyingTo={reply.replyingTo}
                user={reply.user}
                username={reply.user.username}
                updateComments={updateComments}
                parentPostId={postId}
                setIsDeleting={setIsDeleting}
                setDeleteWithID={setDeleteWithID}
                editComment={editComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
