// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { TopMenu } from '@/components';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <Sidebar/>
          
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        
        <TopMenu/>
    

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-10 pt-6 m-2 p-2 pb-5 rounded shadow-lg">

          {/* TODO: dashboard/page.tsx  */}
          {/* Este contenido va dentro de page.tsx */}
          {children}
      
          {/* TODO: fin del dashboard/page.tsx  */}



        {/* TODO: Fin del contenido en el Layout.tsx */}
        </div>
      </div>
    </>
  );
}