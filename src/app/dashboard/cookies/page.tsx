import { cookies } from 'next/headers'


import { TabBar } from "@/components/TabBar"


export const metadata = {
  title: 'Cookies Page',
  description: 'SEO Title'  
}


export default function CookiesPage () {

  const cookieStore = cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

  const allCookies = cookieStore.getAll()


    return(
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {JSON.stringify(allCookies)}
        <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={ +cookieTab }/>


        </div>
      </div>

    )
}