const jwt = require('jsonwebtoken');

const clave = process.env.JWTPRIVATEKEY;

const decodificarTokenMiddleware = (req, res) => {
  // Obtener el token de las cookies de la solicitud
  const token = req.cookies.token;
  

  if (!token) {
    return res.status(401).json({ message: 'Token no provisto' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, clave);

    // Enviar los datos decodificados como respuesta al front-end
    return res.status(200).json({data: decoded})
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    console.error('Error al decodificar el token:', error);
    return res.status(500).json({ message: 'Error al decodificar el token' });
  }
};

module.exports = decodificarTokenMiddleware;