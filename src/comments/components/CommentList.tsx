'use client';

import React from 'react';
import Link from 'next/link';

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  userName?: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) return <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>;

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-white rounded-lg shadow">
          <Link href={`/dashboard/profile/${comment.userId}`}>
            <p className="font-semibold">{comment.userName || 'Usuario desconocido'}</p>
          </Link>
          <p>{comment.content}</p>
          <small className="text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};
