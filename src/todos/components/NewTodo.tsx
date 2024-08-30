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
    router.replace('/dashboard/eventos')

    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full max-w-lg mx-auto space-y-4 p-4 bg-white rounded-lg shadow-lg">

<input
    type="text"
    onChange={(e) => setTitle(e.target.value)}
    value={title}
    className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all"
    placeholder="Título del evento"
  />

<input
    type="text"
    onChange={(e) => setDescription(e.target.value)}
    value={description}
    className="w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-500 transition-all"
    placeholder="Agrega una descripción"
  />

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