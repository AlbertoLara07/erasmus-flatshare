// __tests__/Register.test.js
jest.mock('next/router', () => ({
    useRouter() {
      return {
        push: jest.fn(),   // simulamos push del router
      };
    },
  }));

// __tests__/Register.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../src/pages/register';
import axios from 'axios';

// Simulamos axios.post
jest.mock('axios');

describe('Página Register', () => {
  it('muestra el formulario y envía datos al hacer submit', async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: 42, name: 'Test', instagram_handle: 'test_ig', role: 'buscador' }
    });

    render(<Register />);

    // Comprueba inputs iniciales
    const nameInput = screen.getByLabelText(/Nombre/i);
    const igInput = screen.getByLabelText(/Instagram/i);
    const roleSelect = screen.getByLabelText(/Rol/i);
    const submitBtn = screen.getByRole('button', { name: /Crear cuenta/i });

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(igInput, { target: { value: 'test_ig' } });
    fireEvent.change(roleSelect, { target: { value: 'buscador' } });

    fireEvent.click(submitBtn);

    // Esperamos a que axios.post haya sido llamado
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/users',
        { name: 'Test', instagram_handle: 'test_ig', role: 'buscador' }
      );
    });
  });
});
