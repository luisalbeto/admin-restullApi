import Image from "next/image"
import Link from "next/link"
import { SidebarItem } from "./SidebarItem"
import {IoCalendarClearOutline, IoListOutline, IoPersonOutline } from "react-icons/io5"
import { LogoutButton } from "./LogOutButton"
import { auth } from "@/auth.config"


const menuItems = [
  {
    icon: <IoCalendarClearOutline/>,
    title: 'Dashboard',
    path: '/dashboard'
  }, 
  {
    icon: <IoListOutline/>,
    title: 'Crear evento',
    path: '/dashboard/server-todos'
  },

  {
    icon: <IoListOutline/>,
    title: 'Eventos',
    path: '/dashboard/eventos'
  },


  {
    icon: <IoPersonOutline/>,
    title: 'Perfil',
    path: '/dashboard/profile'
  },
]


export const Sidebar = async() => {

  const session = await auth()
  const name = session?.user?.name ?? 'No Name'
  const lastName = session?.user?.lastName ?? 'No lastName'




  {/*const avatarUrl = ( session?.user?.image)
  ? session.user.image
  : 'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'

  
  */}

  return(
    <>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="#" title="home">
              {/* Next/Image */}
              <Image 
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
                className="w-32" 
                alt="tailus logo" 
                width={150} 
                height={150}/>
            </Link>
          </div>

          <div className="mt-8 text-center flex-row">
              <span className="hidden text-gray-400 lg:block capitalize">
              <p className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{name} {lastName}</p>

              </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {
              menuItems.map( item => (
                <SidebarItem key={ item.path } {...item}/>
              ))
            }
            
          </ul>
        </div>

          <LogoutButton/> 
        
      </aside>
    </>
  )

}