import { RegisterForm } from "./ui/RegisterForm";

export default function NewAccountPage() {
  return (
    <div className="flex justify-center items-center min-h-screen px">
  <div className="w-full p-6 rounded-lg shadow-lg">
    <h1 className="text-3xl sm:text-4xl mb-5 text-center text-blue-400 font-bold">Nueva Cuenta</h1>
    <RegisterForm/>
    
  </div>
</div>
 
  );
}


