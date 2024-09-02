

import { CountdownTimer } from "@/components";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

// Esta función se ejecuta en el servidor y obtiene los datos del evento
export default async function EventPage({ params }: Props) {

  const todo: Todo | null = await prisma.todo.findUnique({
    where: { id: params.id },
  });


  if (!todo) {
    return <div>Evento no encontrado</div>;
  }

 

  return (
    <div>
      <h1>Evento: {todo.title}</h1>
      <p>Descripción: {todo.description}</p>
      <p>Fecha del evento: {new Date(todo.eventDate).toLocaleDateString()}</p>
      <hr/>
      <CountdownTimer eventDate={todo.eventDate} />
    </div>
  );
}
