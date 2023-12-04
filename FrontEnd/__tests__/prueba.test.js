import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios'); // Mockear el módulo axios

describe('Login', () => {
  it('realiza el inicio de sesión correctamente', async () => {
    // Mockear la respuesta exitosa de la solicitud de inicio de sesión
    axios.post.mockResolvedValueOnce({
      data: {
        usuario: {
          token: 'token-de-prueba',
        },
      },
    });

    // Renderizar el componente
    const { getByLabelText, getByText } = render(<Login />);

    // Obtener los campos de entrada y el botón de inicio de sesión
    const emailInput = getByLabelText('Correo Electrónico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Ingresar');

    // Simular cambios en los campos de entrada
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simular el envío del formulario
    fireEvent.click(submitButton);

    // Verificar que se haya realizado la solicitud de inicio de sesión con los datos correctos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      correo: 'example@example.com',
      contraseña: 'password123',
    });

    // Esperar a que se muestre el mensaje de éxito y se redireccione al usuario
    await waitFor(() => {
      expect(getByText('Inicio de sesión exitoso')).toBeInTheDocument();
      expect(window.location.pathname).toBe('/');
    });
  });

  it('muestra un mensaje de error al realizar un inicio de sesión fallido', async () => {
    // Mockear una respuesta de error de la solicitud de inicio de sesión
    axios.post.mockRejectedValueOnce(new Error('Error de inicio de sesión'));

    // Renderizar el componente
    const { getByLabelText, getByText } = render(<Login />);

    // Obtener los campos de entrada y el botón de inicio de sesión
    const emailInput = getByLabelText('Correo Electrónico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Ingresar');

    // Simular cambios en los campos de entrada
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simular el envío del formulario
    fireEvent.click(submitButton);

    // Verificar que se haya realizado la solicitud de inicio de sesión con los datos correctos
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      correo: 'example@example.com',
      contraseña: 'password123',
    });

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(getByText('Error al iniciar sesión')).toBeInTheDocument();
    });
  });
});