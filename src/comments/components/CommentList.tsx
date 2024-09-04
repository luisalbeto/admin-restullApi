'use client';

import React, { useEffect, useState } from 'react';
import * as commentsApi from '@/comments/helpers/comments';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  userName?: string; 
}

interface CommentListProps {
  todoId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ todoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCommentsAndUsers = async () => {
      try {
        setLoading(true);
        const fetchedComments = await commentsApi.getCommentsByTodoId(todoId);

        // Para cada comentario, obtener el nombre del usuario
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

    router.refresh();
    fetchCommentsAndUsers();
  }, [todoId]);

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (comments.length === 0) return <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>;

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4 bg-white rounded-lg shadow">


            <Link href={`/dashboard/profile/${comment.userId}`}>
            <p className="font-semibold">{comment.userName || 'Usuario desconocido'}</p> {/* Mostrar el nombre del usuario */}
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
