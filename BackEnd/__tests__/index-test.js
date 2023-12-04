const articulosController = require('../src/controllers/blog-c');
const articulos = require('../src/models/articulos');

test('Debería enviar un mensaje de error si no hay artículos en la base de datos', async () => {
    // Simula una solicitud y una respuesta
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn(),
    };
  
    // Sobreescribe la función find del modelo para que devuelva un array vacío
    articulos.find = jest.fn().mockResolvedValue([]);
  
    // Ejecuta la función de obtenerArticulos
    await articulosController.obtenerArticulos(req, res);
  
  });

  test('Debería obtener los artículos correctamente', async () => {
    // Simula una solicitud y una respuesta
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn(),
    };
  
    // Ejecuta la función de obtenerArticulos
    await articulosController.obtenerArticulos(req, res);
  
    // Verifica el comportamiento esperado
    expect(res.status).toHaveBeenCalledWith(200);
  });