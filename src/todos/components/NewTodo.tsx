'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IoTrashOutline } from 'react-icons/io5';
import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';
import { deletedCompleted } from '../actions/todo-actions';

interface FormValues {
  title: string;
  description: string;
  eventDate: string;
}

export const NewTodo = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      eventDate: ''
    }
  });
  
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.eventDate) {
      return;
    }

    // Crear el todo con título, descripción y fecha
    await todosApi.createTodo(
      data.title,
      data.description,
      data.eventDate
    );
    

    router.refresh();
    router.replace(`/dashboard/eventos`);

    reset(); // Reiniciar el formulario
  };

  // Obtener la fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full max-w-lg mx-auto space-y-4 p-4 bg-white rounded-lg shadow-lg">
      
      <input
        type="text"
        {...register('title', { required: 'El título es obligatorio' })}
        className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all ${errors.title ? 'border-red-500' : ''}`}
        placeholder="Título del evento"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <input
        type="text"
        {...register('description', { required: 'La descripción es obligatoria' })}
        className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all ${errors.description ? 'border-red-500' : ''}`}
        placeholder="Agrega una descripción"
      />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <input
        type="date"
        {...register('eventDate', { required: 'La fecha del evento es obligatoria', min: { value: today, message: 'La fecha del evento no puede ser anterior a hoy' } })}
        className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all ${errors.eventDate ? 'border-red-500' : ''}`}
        placeholder="Fecha del evento"
        min={today}
      />
      {errors.eventDate && <p className="text-red-500">{errors.eventDate.message}</p>}

      <div className="flex justify-between space-x-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-sky-500 py-2 text-white hover:bg-sky-700 transition-all"
        >
          Crear
        </button>

        <button
          onClick={() => deletedCompleted()}
          type="button"
          className="flex-1 rounded-lg bg-red-400 py-2 text-white hover:bg-red-700 transition-all flex items-center justify-center"
        >
          <IoTrashOutline className="mr-2" />
          Delete
        </button>
      </div>
    </form>
  );
};
