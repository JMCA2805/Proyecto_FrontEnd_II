const nodemailer = require("nodemailer");
const Usuario = require("../models/user");

enviarEmail = async (pago) => {
  const config = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secureConnection: false,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PWD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  };

  const transport = nodemailer.createTransport(config);

  const productosHTML = generateProductRowsHTML(pago.producto);
  const totalHTML = generateTotalHTML(pago.producto);

  const HTMLmensaje = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Pago</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
      }

      .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: rgb(33,58,225);
          background: radial-gradient(circle, rgba(33,58,225,1) 0%, rgba(51,88,210,1) 26%, rgba(19,28,83,1) 67%, rgba(14,28,112,1) 100%);
      }
  
      .header {
          text-align: center;
          margin-bottom: 30px;
      }
  
      .header img {
          max-width: 200px;
      }

      .header h1{
        color: white;
      }
  
      .fecha{
        text-align: right;
      }
      .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
  
      .content h2 {
          margin-top: 0;
      }
  
      .content p {
          margin-bottom: 20px;
      }
  
      .payment-summary {
          margin-top: 30px;
          border-top: 1px solid #dddddd;
          padding-top: 20px;
      }
  
      .payment-summary h3 {
          margin-top: 0;
      }
  
      .payment-summary table {
          width: 100%;
          margin-top: 10px;
          border-collapse: collapse;
      }
  
      .payment-summary table th,
      .payment-summary table td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #dddddd;
      }
      .footer {
          text-align: center;
          margin-top: 30px;
      }

      .footer p{
          color: white;
      }
      </style>
  </head>
  <body>
      <div class="container">
      <div class="header">
          <img src="https://i.imgur.com/so4ClLy.png" alt="Logo">
          <h1>¡Gracias!</h1>
      </div>
      <div class="content">
        <p class="fecha"><b> ${pago.fecha} </b></p>
          <h2>Confirmación de Pago Factura ${pago.factura}</h2>
          <p>Estimado ${pago.nombre} ${pago.apellido},</p>
          <p>Gracias por su compra. Nos complace confirmar que su pago ha sido procesado con éxito.</p>
          <p>A continuación, encontrará un resumen de los detalles de su pago:</p>
          <div class="payment-summary">
          <h3>Resumen del Pago</h3>
            <table id="tabla-productos">
            <tr>
                <th>Nombre producto</th>
                <th>Cantidad</th>
                <th>Monto</th>

            </tr>
            ${productosHTML}
            <tr>
                <td colspan="2" style="text-align: right;"><strong>TOTAL:</strong></td>
                <td>${totalHTML}</td>
            </tr>
            </table>
        </div>
      </div>
      <div class="footer">
          <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en contactarnos.</p>
          <p>Atentamente,</p>
          <p>Equipo de WebStore Wonderland</p>
      </div>
      </div>
    </body>
    </html>
  `

  const mensaje = {
    from: process.env.MAIL_ADDRESS,
    to: pago.correo,
    subject: `Confirmación de pago Factura ${pago.factura}`,
    html: HTMLmensaje,
  };


  // Función para generar las filas de productos en HTML
    function generateProductRowsHTML(productos) {
        let rowsHTML = "";
  
        productos.forEach((producto) => {
        const rowHTML = `
            <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}$</td>

            </tr>
        `;
        rowsHTML += rowHTML;
        });
  
        return rowsHTML;
    } 

// Función para generar el total en HTML
    function generateTotalHTML(productos) {
        let total = 0;
    
        productos.forEach((producto) => {
        total += producto.precio * producto.cantidad;
        });
    
        return `<strong>$${total}</strong>`;
    }

  const info = await transport.sendMail(mensaje);

  console.log("Correo enviado correctamente");
};
/*
enviarOferta = async () => {
  let contador = 0;
  const usuarios = await Usuario.find();

  const config = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secureConnection: false,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PWD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  };

  const transport = nodemailer.createTransport(config);

  for (i = 0; i < usuarios.length; i++) {
    const mensaje = {
      from: process.env.MAIL_ADDRESS,
      to: usuarios[i].correo,
      subject: `Ofertas en Habitaciones`,
      html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        width: 100%;
                        margin: 0;
                        padding: 20px;
                    }
                    
                    h1 {
                        color: #1d1a2f;
                    }
                    
                    h2 {
                        color: #ff4081;
                    }
                    
                    p {
                        margin: 10px 0;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 30px;
                        text-align: center;
                        border: solid #8bd450;
                    }
            
                    .fondodegrade {
                        background: 
                        radial-gradient(
                            farthest-side at bottom left,
                            #965fd4, 
                            transparent
                        ),
                        radial-gradient(
                            farthest-corner at bottom right,
                            #3f6d4e, 
                            transparent 900px
                        );
                        padding: 20px;
                    }
            
                    .fondo {
                        margin: 0;
                        background: #1d1a2f;
                    }
                    
                    .contact-info {
                        background-color: #311b92;
                        padding: 20px;
                        color: #ffffff;
                        border-radius: 5px;
                        border: solid #8bd450;
                    }
                    
                    .contact-info p {
                        margin-bottom: 10px;
                    }
                    ul{
                        list-style: none;
                        padding: 0;
                    }                 
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="fondo"> 
                    <div class="fondodegrade"> 
                        <div class="container">
                            <h1>Hotel Águila</h1>
                            <h2>¡Promociones especiales!</h2>
                            <p>Estimado(a) <strong>${usuarios[i].nombre} ${usuarios[i].apellido}</strong>,</p>
                            <p>Aproveche nuestras ofertas exclusivas:</p>
                            <ul class="contact-info">
                                <li><strong>Descuento del 20% en estancias de más de 3 noches.</strong></li>
                                <li><strong>Paquete de spa y masajes con un 15% de descuento.</strong></li>
                                <li><strong>Desayuno buffet gratuito para niños menores de 12 años.</strong></li>
                            </ul>
                            <p>No pierda la oportunidad de disfrutar de estas increíbles promociones durante su estadía en Hotel Águila.</p>
                            <p>Atentamente,</p>
                            <p>Equipo de Hotel Águila</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
    };

    const info = await transport.sendMail(mensaje);

    contador = contador + 1;
  }

  console.log("Ofertas enviada correctamente, total: " + contador);
};
*/
module.exports = { enviarEmail };
