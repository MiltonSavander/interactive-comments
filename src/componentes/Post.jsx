import React, { useEffect } from "react";
import Likes from "./Likes";
import ReplyToPost from "./ReplyToPost";
import { useState } from "react";
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
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const isUser = false;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-neutral-white relative flex flex-row gap-6 rounded-lg p-6 shadow-md">
        <Likes
          score={score}
          postId={postId}
          updateScore={updateScore}
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-4">
            <div className="size-9">
              <img
                src={user.image.png}
                alt={`${user.username} avatar`}
              />
            </div>
            <div className="font-medium">{username}</div>
            <div className="text-neutral-grey-500">{createdAt}</div>
          </div>
          <div className="text-neutral-grey-500">{content}</div>
        </div>
        {isUser ? (
          <div className="absolute flex flex-row items-center gap-8 top-6 right-6">
            <button className="flex flex-row items-center gap-2 font-bold text-primary-pink-400 cursor-pointer hover:opacity-65 transition-opacity duration-200 ease-in-out">
              <img
                src="images/icon-delete.svg"
                alt="delete icon"
              />
              <p>Delete</p>
            </button>
            <button className="flex flex-row items-center gap-2 font-bold text-primary-purple-600 cursor-pointer hover:opacity-65 transition-opacity duration-200 ease-in-out">
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
            className="text-primary-purple-600 absolute top-6 right-6 flex cursor-pointer flex-row items-center font-bold gap-2 hover:opacity-65 transition-opacity duration-200 ease-in-out"
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
      {replies.length > 0 && (
        <div className="flex flex-row mt-2 ">
          <div className="flex justify-center w-26">
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
                isUser={isUser}
              />
            ))}
          </div>
        </div>
      )}
      {isReplying && (
        <ReplyToPost
          setIsReplying={setIsReplying}
          updateComments={updateComments}
          username={username}
          postId={postId}
        />
      )}
    </div>
  );
};

export default Post;
