// src/pages/flats/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlatDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchFlat() {
      try {
        const res = await axios.get(`http://localhost:5000/api/flats/${id}`);
        setFlat(res.data);
      } catch (err) {
        console.error('Error al cargar detalle:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFlat();
  }, [id]);

  const handleReserve = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Debes registrarte antes de reservar un piso.');
      return;
    }
  
    setReserving(true);
    try {
      await axios.post(
        `http://localhost:5000/api/flats/${id}/reserve`,
        { user_id: userId }
      );
      alert('Reserva enviada, ¡buena suerte!');
    } catch (err) {
      console.error('Error al reservar:', err);
      alert('Error al reservar. Comprueba la consola.');
    } finally {
      setReserving(false);
    }
  };
  

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!flat) return <p className="text-center mt-10">Piso no encontrado.</p>;

  return (
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
  <h1 className="text-2xl font-bold mb-4">{flat.title}</h1>
  <p className="mb-2">{flat.description}</p>
  <p className="mb-2">Precio: {flat.price} € / mes</p>
  <p className="mb-4">Plazas totales: {flat.total_spots}</p>
  {flat.whatsapp_invite && (
    <a
      href={flat.whatsapp_invite}
      target="_blank"
      rel="noopener noreferrer"
      className="block mb-4 text-blue-500 underline"
    >
      Enlace WhatsApp
    </a>
  )}
  <button
    onClick={handleReserve}
    disabled={reserving}
    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
  >
    {reserving ? 'Enviando reserva…' : 'Reservar plaza'}
  </button>
</div>
  );
}
