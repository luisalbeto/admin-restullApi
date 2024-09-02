import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
     <Link href='/'>

     <span className={`antialiased font-bold`}>Prueba</span>
     <span> | Eventos</span>
     <span> © {new Date().getFullYear()}</span>
      
      </Link>

      <Link
      className="mx-3"
      href='/'
      > Privacidad & legal</Link>

      <Link
      className="mx-3"
      href='/'
      > Ubicaciones</Link>

    </div>
  )
}