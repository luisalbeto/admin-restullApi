import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
<div className="flex justify-center items-center min-h-screen px-4">
  <div className="w-full p-6 rounded-lg shadow-lg">
    <h1 className="text-3xl sm:text-4xl mb-5 text-center text-blue-400 font-bold">Login</h1>
    <LoginForm />
  </div>
</div>
  );
}