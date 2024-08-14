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
        </div>

    </div>
  
  )
}