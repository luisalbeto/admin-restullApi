import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

// GET /api/users/[userId]
export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    // Validar la sesión del usuario (autenticación)
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const { userId } = params;

    // Buscar al usuario por su ID en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Devolver los detalles del usuario
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
