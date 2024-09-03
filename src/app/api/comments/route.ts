import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

const postSchema = yup.object({
  content: yup.string().required('El contenido del comentario es obligatorio'),
  todoId: yup.string().required('El ID del evento es obligatorio'),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json('No autorizado', { status: 401 });
  }

  try {
    // Validar los datos del cuerpo de la solicitud
    const { content, todoId } = await postSchema.validate(await request.json(), {
      abortEarly: false,
    });

    // Crear el comentario
    const comment = await prisma.comment.create({
      data: {
        content,
        todoId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error de validación', details: error }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const todoId = searchParams.get('todoId');
  const take = Number(searchParams.get('take') ?? 10);
  const skip = Number(searchParams.get('skip') ?? 0);

  if (!todoId) {
    return NextResponse.json({ message: 'El ID del evento es obligatorio' }, { status: 400 });
  }

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json({ message: 'Take y Skip deben ser números' }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { todoId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error al obtener los comentarios', details: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json('No autorizado', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get('commentId');

  if (!commentId) {
    return NextResponse.json({ message: 'El ID del comentario es obligatorio' }, { status: 400 });
  }

  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(deletedComment);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Error al eliminar el comentario', details: error }, { status: 400 });
  }
}
