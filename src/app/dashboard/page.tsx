import { auth } from "@/auth.config";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";


export default async function DashboardPage() {

  const session = await auth()
  
  if( !session?.user){
    redirect('/auth/login')
  }

  return(
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-full overflow-hidden">
            
    <WidgetItem title="Usuario Conectado Server-Side">
      <div className="flex flex-col break-words">
        <span className="text-bold text-xl"> Nombre: {session.user?.name}</span>
        <span className="text-bold text-xl">Apellido: {session.user?.lastName}</span>
        <span className="text-bold text-xl">Usuario: {session.user?.userName}</span>
        <span className="text-bold text-xl">Email: {session.user?.email}</span>



      </div>

    </WidgetItem> 

    
   
  </div>  
  )
}