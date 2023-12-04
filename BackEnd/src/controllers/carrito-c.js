const Usuario = require("../models/user.js");
const productos = require("../models/products.js");

class carritoController {
  // Controlador para guardar una nuevo pago
  consultarCarrito = async (req, res) => {

    let preciototal = 0
    try {

      //const { serial, action } = req.body;
      const idUser = req.params.id
      let data
      let imagenCompleta
      let carrito = []
      let serial
      const usuario = await Usuario.find({_id: idUser});

      const carritoUsuario = usuario[0].carrito

      for(let i = 0; i < carritoUsuario.length ; i++){

        serial = carritoUsuario[i].serial

        const producto = await productos.find({serial: serial})
        data = producto[0].imagen.data
        imagenCompleta = 'data:'+producto[0].imagen.contentType+";base64,"+data.toString('base64')

        carrito[i] = {
          serial: producto[0].serial,
          nombre: producto[0].nombre,
          descripcion: producto[0].descripcion,
          precio: producto[0].precio,
          cantidad: carritoUsuario[i].cantidad,
          imagen: imagenCompleta
        }

        if(carritoUsuario[i].cantidad){
          preciototal = preciototal + (Number(producto[0].precio) * Number(carritoUsuario[i].cantidad))
        }else{
          preciototal = preciototal + Number(producto[0].precio)
        }
      }

        res.status(201).send({carrito, preciototal});
      
    } catch (error) {
      console.error("Error al consultar Carrito:", error);
      res.status(500).json({ Error: "Error al consultar Carrito" });
    }
  };

  agregarCompraCarrito = async (req, res) => {
    try {

      const datos = req.body;
      const usuario = await Usuario.findOne({ _id: datos.user });
  
      // Buscar el objeto con el serial correspondiente en el array "carrito"
      const itemCarrito = usuario.carrito
      const itemCarritos = datos.items
      let carritoUpdate = []

      for(let i = 0; i<itemCarrito.length; i++){

        for(let j = 0; j<itemCarritos.length; j++){

          if (itemCarritos[j].serial == itemCarrito[i].serial){

            carritoUpdate[j] = {
              serial: itemCarrito[i].serial,
              nombre: itemCarrito[i].nombre,
              descripcion: itemCarrito[i].descripcion,
              precio: itemCarrito[i].precio,
              cantidad: datos.items[j].quantity
            }
          }
        }
      }

      console.log(carritoUpdate)
      await Usuario.updateOne({ _id: datos.user }, { $set: { carrito: carritoUpdate } });

        res.status(201).send('gracias');
      
    } catch (error) {
      console.error("Error al consultar Carrito:", error);
      res.status(500).json({ Error: "Error al consultar Carrito" });
    }
  };

}

const carritoC = new carritoController();

module.exports = carritoC;
