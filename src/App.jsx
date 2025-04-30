import "./globals.css";
import Post from "./componentes/Post";
import data from "../data.json";
import { useState, useEffect } from "react";
import MakePost from "./componentes/MakePost";

function App() {
  const [myData, setMyData] = useState(data);
  const [sortedComments, setSortedComments] = useState([]);

  const updateScore = (postId, increment) => {
    setMyData((prevData) => {
      const updatedComments = prevData.comments.map((comment) => {
        if (comment.id === postId) {
          return { ...comment, score: comment.score + increment };
        }

        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === postId) {
            return { ...reply, score: reply.score + increment };
          }
          return reply;
        });

        return { ...comment, replies: updatedReplies };
      });

      return { ...prevData, comments: updatedComments };
    });
  };

  useEffect(() => {
    const sorted = [...myData.comments].map((comment) => {
      const sortedReplies = [...comment.replies].sort((a, b) => {
        if (b.score === a.score) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.score - a.score; // Higher score first
      });

      return { ...comment, replies: sortedReplies };
    });

    const sortedComments = sorted.sort((a, b) => {
      if (b.score === a.score) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.score - a.score;
    });

    setSortedComments(sortedComments);
  }, [myData]);

  const updateComments = (newComments, isReplyingTo, replyingToID, parentPostId) => {
    const latestID = Math.max(
      ...myData.comments.map((comment) => comment.id),
      ...myData.comments.flatMap((comment) => comment.replies.map((reply) => reply.id)) //
    );
    const newPost = {
      id: latestID + 1,
      content: newComments,
      createdAt: "now",
      score: 0,
      user: myData.currentUser,
      ...(isReplyingTo && { replyingTo: isReplyingTo }),
      ...(!isReplyingTo && { replies: [] }),
      username: myData.currentUser.username,
    };

    setMyData((prevData) => {
      if (!isReplyingTo) {
        console.log("case 1");
        return {
          ...prevData,
          comments: [...prevData.comments, newPost],
        };
      }
      if (isReplyingTo && !parentPostId) {
        console.log("case 2");
        return {
          ...prevData,
          comments: prevData.comments.map((comment) => {
            if (comment.id === replyingToID) {
              return {
                ...comment,
                replies: [...comment.replies, newPost],
              };
            }
            return comment;
          }),
        };
      }
      if (isReplyingTo && parentPostId) {
        console.log("case 3");
        return {
          ...prevData,
          comments: prevData.comments.map((comment) => {
            if (comment.id === parentPostId) {
              return {
                ...comment,
                replies: [...comment.replies, newPost],
              };
            }
            return comment;
          }),
        };
      }
      return prevData;
    });
  };

  return (
    <>
      <main className="flex flex-col gap-4 items-center pt-40 max-w-[720px] mx-auto">
        {sortedComments.map((comment) => (
          <Post
            key={comment.id}
            postId={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            user={comment.user}
            username={comment.user.username}
            replies={comment.replies}
            updateScore={updateScore}
            updateComments={updateComments}
          ></Post>
        ))}
        <MakePost updateComments={updateComments} />
      </main>
    </>
  );
}

export default App;
