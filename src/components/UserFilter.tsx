'use client'
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface UserFilterProps {
  users: User[];
  selectedUserId?: string;
}

export const UserFilter = ({ users, selectedUserId }: UserFilterProps) => {
  const router = useRouter();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    if (userId) {
      router.push(`/dashboard?userId=${userId}`);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="mb-8">
      <label htmlFor="user-select" className="block text-lg font-medium text-blue-700 mb-2">
        Filtrar por usuario:
      </label>
      <select
        id="user-select"
        name="user"
        value={selectedUserId || ''}
        className="bg-white border border-blue-300 text-blue-700 py-2 px-4 rounded-md focus:outline-none"
        onChange={handleUserChange}
      >
        <option value="">Todos los usuarios</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
