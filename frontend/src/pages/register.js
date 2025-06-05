// src/pages/register.js
// TEST HUSKY LINT-STAGED
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    instagram_handle: '',
    role: 'buscador',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users', form);
      localStorage.setItem('userId', res.data.id);
      router.push('/flats');
    } catch (err) {
      console.error(err);
      alert('Error al registrar. Comprueba la consola.');
    }
  };

  return (
    <Layout>
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label htmlFor="instagram_handle" className="block mb-1">
            Instagram
          </label>
          <input
            id="instagram_handle"
            name="instagram_handle"
            value={form.instagram_handle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="@usuario"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block mb-1">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="buscador">Buscador</option>
            <option value="anfitrión">Anfitrión</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          aria-label="Crear cuenta"
        >
          Crear cuenta
        </button>
      </form>
    </div>
    </Layout>
  );
}
