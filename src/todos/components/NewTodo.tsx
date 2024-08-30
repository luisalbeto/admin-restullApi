'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";
import { deletedCompleted } from "../actions/todo-actions";

export const NewTodo = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim().length === 0 || description.trim().length === 0) return;

    // Crear el todo con título y descripción
    await todosApi.createTodo(
      title,
      description,
    );
    router.refresh();

    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full space-y-4'>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="Título del evento"
      />

      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <div className="flex w-full">
        <button
          type='submit'
          className="flex items-center justify-center rounded bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
        >
          Crear
        </button>

        <span className='flex flex-1'></span>

        <button
          onClick={() => deletedCompleted()}
          type='button'
          className="flex items-center justify-center rounded bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
        >
          <IoTrashOutline />
          Delete
        </button>
      </div>
    </form>
  );
};