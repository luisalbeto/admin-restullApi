'use client';

import React, { useEffect, useState } from 'react';
import * as commentsApi from '@/comments/helpers/comments';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  userName?: string;
}

interface CommentSectionProps {
  todoId: string;
  userId: string;
  userName: string; // Añadir el userName del usuario autenticado
}

export const CommentSection: React.FC<CommentSectionProps> = ({ todoId, userId, userName }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommentsAndUsers = async () => {
      try {
        setLoading(true);
        const fetchedComments = await commentsApi.getCommentsByTodoId(todoId);

        const commentsWithUserNames = await Promise.all(
          fetchedComments.map(async (comment) => {
            const user = await commentsApi.getUserById(comment.userId);
            return { ...comment, userName: user.name };
          })
        );

        setComments(commentsWithUserNames);
      } catch (err) {
        setError('Error al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsAndUsers();
  }, [todoId]);

  // Función para agregar un nuevo comentario al estado
  const handleCommentAdded = (newComment: Comment) => {
    const commentWithUserName = { ...newComment, userName }; // Añadir el nombre del usuario autenticado
    setComments((prevComments) => [...prevComments, commentWithUserName]);
  };

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <CommentForm todoId={todoId} userId={userId} onCommentAdded={handleCommentAdded} />
      <CommentList comments={comments} />
    </div>
  );
};
