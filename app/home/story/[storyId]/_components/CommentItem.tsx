"use client";

import useLang from "@/lib/hooks/useLang";
import { IComment } from "@/lib/types";
import { Heart, User, Reply, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { memo, useRef, useState } from "react";

const titleAnswer = {
  en: "Reply",
  ru: "Ответить",
};
const commentsPlaceholder = {
  en: "Write your reply...",
  ru: "Напишите ответ...",
};
const sendTitle = {
  en: "Send",
  ru: "Отправить",
};

const CommentItem = memo(function Item({
  comment,
  refetch,
  ref,
}: {
  comment: IComment;
  refetch: () => Promise<unknown>;
  ref?: React.RefObject<HTMLDivElement | null> | null;
}) {
  const [lang] = useLang();
  const [answerFlag, setAnswerFlag] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [answers, setAnswers] = useState<IComment[]>(comment.answers);
  const [showReplies, setShowReplies] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: session } = useSession();

  const handleCreateComment = async () => {
    if (session && answerFlag && textComment.trim()) {
      try {
        const res = await fetch("/api/story/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: textComment,
            storyId: comment.storyId,
            comment_id: comment.id,
            authorId: (session.user as { id: string }).id,
          }),
        });

        if (res.ok) {
          const newAnswer = await res.json(); // Получаем созданный комментарий от сервера
          console.log(newAnswer);
          setAnswers((prev) => [...prev, newAnswer]);
          // Добавляем новый ответ в локальный массив
          await refetch();
          setTextComment("");

          // Опционально: запускаем глобальный рефреш для синхронизации с другими компонентами
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAnswer = () => {
    setAnswerFlag(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleGetComment = async () => {
    try {
      const res = await fetch(
        `/api/story/comment/answers?commentId=${comment.id}`,
      );
      const data = await res.json();
      setAnswers(data);
      setShowReplies(!showReplies);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      ref={ref}
      className="p-4 bg-white w-full rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      {/* Header with user info */}
      <div className="flex items-start gap-3">
        {comment.author.image ? (
          <Image
            width={32}
            height={32}
            src={comment.author.image}
            alt={comment.author.username}
            className="shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={16} className="text-gray-500" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 text-sm">
              {comment.author.username}
            </h4>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt as unknown as string)}
            </span>
          </div>

          {/* Comment content */}
          <p className="text-gray-800 mt-2 leading-relaxed">
            {comment.content}
          </p>

          {/* Actions row */}
          <div className="flex items-center gap-4 mt-3">
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
              title="Like comment">
              <Heart
                size={16}
                fill={comment.likes.length > 0 ? "currentColor" : "none"}
              />
              <span className="text-sm">{comment.likes.length}</span>
            </button>

            <button
              onClick={handleAnswer}
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium">
              <Reply size={14} />
              {titleAnswer[lang]}
            </button>

            {answers && answers.length > 0 && (
              <button
                onClick={handleGetComment}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors text-sm">
                {showReplies ? "Скрыть" : "Показать"} ответы ({answers.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply input */}
      {answerFlag && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
              placeholder={commentsPlaceholder[lang]}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleCreateComment()}
            />
            <button
              onClick={handleCreateComment}
              disabled={!textComment.trim()}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-1">
              <Send size={14} />
              {sendTitle[lang]}
            </button>
          </div>
        </div>
      )}

      {/* Replies section */}
      {showReplies && answers.length > 0 && (
        <div className="mt-4 ml-8 border-l-2 border-gray-200 pl-4">
          {answers.map((answer) => (
            <CommentItem key={answer.id} refetch={refetch} comment={answer} />
          ))}
        </div>
      )}
    </div>
  );
});

export default CommentItem;
