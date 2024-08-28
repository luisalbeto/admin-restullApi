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
            
    <WidgetItem title="Usuario Conectado S-Side">
      <div className="flex flex-col break-words">
        <span>{session.user?.name}</span>
        <span>{session.user?.image}</span>
        <span>{session.user?.email}</span>

        <div>
          {JSON.stringify( session )}
        </div>


      </div>

    </WidgetItem> 

    
   
  </div>  
  )
}