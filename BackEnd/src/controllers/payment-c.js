const Usuario = require("../models/user.js");
const Compras = require("../models/compras.js");

const { enviarEmail } = require("../scripts/nodemailer");

class pagosController {
  // Controlador para guardar una nuevo pago
  agregarPago = async (req, res) => {
    try {
        var fechaActual = new Date().toLocaleDateString();

        // GENERA UN CODIGO RANDOM DE FACTUA
        function generateRandomCode() {
            const codeLength = 6;
            const codePrefix = 'F';
            const digits = '0123456789';
            let code = codePrefix;
          
            for (let i = 0; i < codeLength - 1; i++) {
              const randomIndex = Math.floor(Math.random() * digits.length);
              code += digits[randomIndex];
            }
          
            return code;
        }
          
        const randomCode = generateRandomCode();
        const datosCliente = req.body.clientData
        const iduser = datosCliente.id
        const producto = req.body.products
        let monto_total = 0

        // CALCULA EL MONTO TOTAL COMPRADO
        for (let i = 0; i < producto.length; i++){
            monto_total = monto_total + (Number(producto[i].precio) * Number(producto[i].cantidad))
        }

        // DATOS PARA EL ENVIO DEL MENSAJE

        const pago = {
            factura: randomCode,
            nombre: datosCliente.nombre,
            apellido: datosCliente.apellido,
            telefono: datosCliente.telefono,
            direccion: datosCliente.direccion,
            correo: datosCliente.correo,
            producto,
            fecha: fechaActual
        }

        // DATOS PARA LA COMPRA EN EL PERFIL

        const pagoUser = {
            factura: randomCode,
            producto,
            monto_total,
            fecha: fechaActual
        }

      
        // DATOS PARA TABLA DE COMPRAS

        const pagoTabla = new Compras({
            idUser: iduser,
            nombre: datosCliente.nombre,
            factura: randomCode,
            producto,
            monto_total,
            fecha_compra: fechaActual
        });

        // AGREGA LA COMPRA A LA TABLA DE COMPRAS
        await pagoTabla.save();

        // AGREGA LA COMPRA AL PERFIL DEL USUARIO
        await Usuario.updateOne({ _id: iduser },{ $push: { compras: pagoUser }});
        await Usuario.updateOne({ _id: iduser }, { $set: { carrito: [] } });

        // ENVIA EL CORREO DE CONFIRMACIÓN DE COMPRA
        try{
          enviarEmail(pago)
        } catch (error){
          console.log('Upss... Ocurrio algo en al enviar el correo', error)
        }

        res.status(201).send("Compra agregada correctamente");
      
    } catch (error) {
      console.error("Error al agregar Compra:", error);
      res.status(500).json({ Error: "Error al agregar Compra" });
    }
  };

}

const pagosC = new pagosController();

module.exports = pagosC;
