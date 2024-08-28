'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function PRofilePage() {

  const {data: session } = useSession()
  
  useEffect(() => {
    console.log('Client Side')
  },[])
  
  
  return(
    <div>
        <h1>ProfilePage</h1>
        <hr/>

        <div className="flex flex-col">
          <span>{session?.user?.name ?? 'No Name'}</span>
          <span>{session?.user?.email ?? 'No Email'}</span>
          <span>{session?.user?.image ?? 'No Image'}</span>
          <span>{session?.user?.id ?? 'No UUID'}</span>
          <span>{session?.user?.roles?.join(',') ?? ['No-roles']}</span>

        </div>

    </div>
  
  )
}