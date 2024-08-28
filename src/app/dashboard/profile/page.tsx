import { auth } from "@/auth.config"
import { redirect } from "next/navigation"


export default async function PRofilePage() {

  const session = await auth()
  
  if( !session?.user){
    redirect('/')
  }


  
  
  return(
    <div>
        <h1>Perfil</h1>
        <hr/>

        <pre>
          {JSON.stringify(session.user, null, 2)}
        </pre>

    </div>
  
  )
}