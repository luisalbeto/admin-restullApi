import { auth } from "@/auth.config"
import { redirect } from "next/navigation"


export default async function PRofilePage() {

  const session = await auth()
  
  if( !session?.user){
    redirect('/dashboard')
  }


  
  
  return(
    <div>
        <h1>Perfil</h1>
        <hr/>

        <pre>
          {JSON.stringify(session.user, null, 2)}
        </pre>

        <h2 className="text-3xl mb-10">{session.user.role}</h2>


    </div>
  
  )
}