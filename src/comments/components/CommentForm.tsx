'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as commentsApi from '@/comments/helpers/comments';
import { useRouter } from 'next/navigation';

interface FormValues {
  content: string;
}



interface CommentFormProps {
  userId: string;
  todoId: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ userId, todoId }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      content: '',
    }
  });
  
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.content.trim()) {
      return;
    }

    // Crear el comentario con contenido, userId y todoId
    await commentsApi.createComment(
      data.content,
      userId,
      todoId
    );

    router.refresh();

    reset(); // Reiniciar el formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-lg mx-auto space-y-4 p-4 bg-white rounded-lg shadow-lg">
      
      <textarea
        {...register('content', { required: 'El contenido del comentario es obligatorio' })}
        className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all ${errors.content ? 'border-red-500' : ''}`}
        placeholder="Escribe tu comentario"
        rows={4}
      />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      <button
        type="submit"
        className="flex-1 rounded-lg bg-sky-500 py-2 text-white hover:bg-sky-700 transition-all"
      >
        Comentar
      </button>
    </form>
  );
};
