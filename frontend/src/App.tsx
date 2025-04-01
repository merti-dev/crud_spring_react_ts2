import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types/User';
import './App.scss';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<Omit<User, 'id'>>({ name: '', email: '' });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/users', form);
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  return (
    <div>
      <h1>User CRUD (Vite + TS + Sass)</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {users.map(user => <li key={user.id}>{user.name} ({user.email})</li>)}
      </ul>
    </div>
  );
}

export default App;
