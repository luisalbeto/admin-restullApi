import { Sidebar } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen flex flex-col">
        {/* TODO: Contenido en el Layout.tsx */}
        <div className="flex-grow flex items-center justify-center px-10 py-6 m-2 rounded shadow-lg">
          {/* TODO: dashboard/page.tsx */}
          {children}
          {/* TODO: fin del dashboard/page.tsx */}
        </div>

        {/* TODO: Fin del contenido en el Layout.tsx */}
      </div>
    </>
  );
}
