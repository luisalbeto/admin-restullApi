import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    jwt({token, user}) {

      if(user) {
        token.data = user
      }

      return token
    },

    session({session, token, user}) {
      console.log({session,token, user})

      session.user = token.data as any

      return session
    }

  },

  providers: [
    credentials({
      async authorize(credentials){
        const parsedCredentials = z
          .object({ email: z.string().email(), name: z.string().max(30), lastName: z.string().max(30), userName: z.string(), password: z.string().min(8) })
          .safeParse(credentials)

          if( !parsedCredentials.success ) return null

          const {email, name, lastName, userName, password} = parsedCredentials.data

          //Buscar el correo y usuario
          const user = await prisma.user.findUnique({where: {email: email.toLocaleLowerCase(), userName }})

          //Comparar las contraseñas

          if( !user ) return null

          if( !bcryptjs.compareSync(password, user.password) ) return null

          //Regresar el usuario sin el password
          const { password: _, ...rest} = user




          return rest
      },
    }),
  ]
} 

export const { signIn, signOut, auth, handlers } = NextAuth( authConfig )