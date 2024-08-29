import { DefaultSession } from "next-auth"



declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      lastName: string
      userName: String
      email: string
      emailVerified?: boolean
      role: string
      image?: string 
    } & DefaultSession['user']
  }
}