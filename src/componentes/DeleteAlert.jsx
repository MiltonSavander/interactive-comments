import React from "react";

const DeleteAlert = ({ setIsDeleting, deleteWithID, deletePost }) => {
  const handleDelete = (postId) => {
    console.log("delete alert postId", postId);
    deletePost(postId);
    setIsDeleting(false);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50">
      <div className="flex flex-col gap-4 max-w-[380px] bg-neutral-white rounded-md p-8 ">
        <h1 className="text-xl font-bold text-neutral-grey-00">Delete comment</h1>
        <p className="text-neutral-grey-500">
          Are you sure you want to delete this comment? This will remove the comment and can't be
          undone.
        </p>
        <div className="flex  gap-4 ">
          <button
            onClick={() => {
              setIsDeleting(false);
            }}
            className="bg-neutral-grey-500 text-neutral-white w-full h-12 rounded-lg"
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              handleDelete(deleteWithID);
            }}
            className="bg-primary-pink-400 text-neutral-white w-full h-12 rounded-lg"
          >
            YES. DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
