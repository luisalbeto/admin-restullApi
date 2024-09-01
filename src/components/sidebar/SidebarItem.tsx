'use client'
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}


export const SidebarItem = ({icon, path, title}:Props) => {

  const pathName = usePathname()
  //const { data: session} = useSession()
 // console.log({session})


     {/* Active className:  */}
  return(
    <li>
    <Link href={ path } className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
          hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
      ${ path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : '' }  
      `}>
      {icon}
      <span className="group-hover:text-white-700">{title}</span>
    </Link>
  </li>
  )
}