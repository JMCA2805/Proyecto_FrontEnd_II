const { json } = require('body-parser');
const products   = require('../models/products');
const Usuario = require("../models/user.js");
const jwt = require('jsonwebtoken')

class productosController {
  obtenerProductos = async (req, res) => {
    try {
      const token = req.cookies.token;
      let decoded
      let idUser
        if(token){
          decoded = jwt.decode(token);
          idUser = decoded.id;
        }

      const productoscom = await products.find();
      let productos2 = []

      if(idUser){
        const usuario = await Usuario.findOne({ _id: idUser });
        const carrito = usuario.carrito;
    
          productos2 = productoscom.map(producto => {
          const data = producto.imagen.data;
          const imagenCompleta = 'data:' + producto.imagen.contentType + ';base64,' + data.toString('base64');
    
          const isInCart = carrito.some(item => item.serial === producto.serial);
    
          return {
            serial: producto.serial,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            cantidad: producto.cantidad,
            precio: producto.precio,
            categoria: producto.categoria,
            imagen: imagenCompleta,
            carrito: isInCart
          };
        });
      }else{

        for(let i = 0; i<productoscom.length;i++){

          const data = productoscom[i].imagen.data
          const imagenCompleta = 'data:'+productoscom[i].imagen.contentType+";base64,"+data.toString('base64')
  
          productos2[i] = {
            serial: productoscom[i].serial,
            nombre: productoscom[i].nombre,
            descripcion: productoscom[i].descripcion,
            cantidad: productoscom[i].cantidad,
            precio: productoscom[i].precio,
            categoria: productoscom[i].categoria,
            imagen: imagenCompleta,
            carrito: false
    
          }
        }
      }

  
      if (productoscom.length === 0) {
        res.status(200).send('No hay productos en la Base de Datos');
      } else {
        res.status(200).json(productos2);
      }
    } catch (error) {
      res.status(500).json({ Error: 'Error al obtener productos' });
    }
  };

  agregarCarrito = async (req, res) => {
    try {

      const idUser = req.params.id
      const action = req.body.accion
      const { serial, nombre, descripcion, precio } = req.body;

      if (action === 'agregar') {
        try {
          // Busca al usuario por su idUser
          const usuario = await Usuario.findOne({ _id: idUser });
    
          if (usuario) {
            // Agrega el serial al arreglo de favoritos

            const existeSerial = usuario.carrito.includes({serial, nombre, descripcion, precio});
            
            if (existeSerial) {
              return
            }

            usuario.carrito.push({serial, nombre, descripcion, precio, cantidad: ''});
    
            // Guarda los cambios en el usuario
            await usuario.save();
          } 
        } catch (error) {
          return res.status(500).json({
            message: 'Error al agregar el producto a favoritos',
            error: error.message
          });
        }
      } else if (action === 'eliminar') {
        try {
          // Busca al usuario por su idUser
          const usuario = await Usuario.findOne({ _id: idUser });
        
          if (usuario) {
            // Verifica si el producto está en la lista de carrito
            const index = usuario.carrito.findIndex((item) => item.serial === serial);
            if (index > -1) {
              // Elimina el producto de la lista de carrito
              usuario.carrito.splice(index, 1);
        
              // Guarda los cambios en el usuario
              await usuario.save();
            }
          }
        } catch (error) {
          return res.status(500).json({
            message: 'Error al eliminar el producto de favoritos',
            error: error.message
          });
        }
      }

      res.status(200).send('Si pasa');
    } catch (error) {
      res.status(500).json({ Error: 'Error al obtener productos' });
    }
  }


  agregarProductos = async (req, res) => {
    try {
      if (req.body.nombreBoton == 'Buscar'){
        let productos = []
        let data
        let imagenCompleta

        if(req.body.filtro == "Nombre"){

          const nombre = req.body.busqueda
          if (!RegExp.escape) {
            RegExp.escape = function(s) {
              return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            };
          }
    
          var regex = new RegExp('.*' + RegExp.escape(nombre) + '.*', 'i');
          const productoscom = await products.find({nombre: regex});
    
    
          for(let i = 0; i<productoscom.length;i++){
    
            data = productoscom[i].imagen.data
            imagenCompleta = 'data:'+productoscom[i].imagen.contentType+";base64,"+data.toString('base64')
    
            productos[i] = {
              serial: productoscom[i].serial,
              nombre: productoscom[i].nombre,
              descripcion: productoscom[i].descripcion,
              cantidad: productoscom[i].cantidad,
              precio: productoscom[i].precio,
              categoria: productoscom[i].categoria,
              imagen: imagenCompleta,
      
            }
          }
    
          res.status(200).json(productos);

        }else if(req.body.filtro == "Categoria"){

          const categoria = req.body.categoria

          const productoscom = await products.find({categoria: categoria});

          for(let i = 0; i<productoscom.length;i++){
    
            data = productoscom[i].imagen.data
            imagenCompleta = 'data:'+productoscom[i].imagen.contentType+";base64,"+data.toString('base64')
    
            productos[i] = {
              serial: productoscom[i].serial,
              nombre: productoscom[i].nombre,
              descripcion: productoscom[i].descripcion,
              cantidad: productoscom[i].cantidad,
              precio: productoscom[i].precio,
              categoria: productoscom[i].categoria,
              imagen: imagenCompleta,
      
            }
          }

          res.status(200).json(productos);
        }

      }else if((req.body.nombreBoton == 'Favorito')){

        const { idUser, serial, action } = req.body;

        if (action === 'Agregar') {
          try {
            // Busca al usuario por su idUser
            const usuario = await Usuario.findOne({ _id: idUser });
      
            if (usuario) {
              // Agrega el serial al arreglo de favoritos

              const existeSerial = usuario.favoritos.includes(serial);
              
              if (existeSerial) {
                return
              }

              usuario.favoritos.push(serial);
      
              // Guarda los cambios en el usuario
              await usuario.save();
            } 
          } catch (error) {
            return res.status(500).json({
              message: 'Error al agregar el producto a favoritos',
              error: error.message
            });
          }
        } else if (action === 'Quitar') {
          try {
            // Busca al usuario por su idUser
            const usuario = await Usuario.findOne({ _id: idUser });
      
            if (usuario) {
              // Verifica si el producto está en la lista de favoritos
              const index = usuario.favoritos.indexOf(serial);
              if (index > -1) {
                // Elimina el producto de la lista de favoritos
                usuario.favoritos.splice(index, 1);
      
                // Guarda los cambios en el usuario
                await usuario.save();
      
              }
            }
          } catch (error) {
            return res.status(500).json({
              message: 'Error al eliminar el producto de favoritos',
              error: error.message
            });
          }
        }

      }else{
        const { serial, nombre, descripcion, cantidad, precio, categoria } = req.body;
        const imagenBuffer = req.file.buffer;
        const contentType = req.file.mimetype;
        
        const serialEquipos = await products.findOne({ serial });
  
        if (serialEquipos) {
          res.status(400).send('Serial de equipo ya registrado');
        } else {
          const nuevoproducto = new products({
            serial,
            nombre,
            descripcion,
            cantidad,
            precio,
            categoria,
            imagen: { data:imagenBuffer , contentType}
  
          });
          await nuevoproducto.save();
          res.status(201).send('Producto agregado correctamente');
        }
      }

    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).json({ Error: 'Error al agregar producto' });
    }
  };
  
  busquedaProductos = async (req, res) => {
    try {
        const serial = req.params.serial;
        const productos = await productos.findById(serial);



        if (productos == ''){
            res.status(200).send('No hay productos en la Base de Datos');
        } else {
            res.status(200).send(productos);
        }

    } catch (error) {
      res.status(404).json({Error: 'Error al obtener productos'})
    }
  };

  eliminarProducto = async (req, res) => {
    try {
      const serial = req.body.serial;

      const producto = await products.findOne({ serial });
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      await products.deleteOne({'serial': serial});

      res.json({ mensaje: 'Producto eliminado correctamente' });
      
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
  };


  editarProducto = async (req, res) => {
    try {
      const { serialviejo, serial, nombre, descripcion, cantidad, precio, categoria } = req.body;
      console.log(req.body)
  
      const imagenBuffer = req.file ? req.file.buffer : undefined;
      const contentType = req.file ? req.file.mimetype : undefined;
  
      const producto = await products.findOne({ serial: serialviejo });
  
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
  
      // Elimina la imagen existente del sistema de archivos
  
      // Actualiza los datos del producto
      if (serial) {
        producto.serial = serial;
      }
      if (nombre) {
        producto.nombre = nombre;
      }
      if (descripcion) {
        producto.descripcion = descripcion;
      }
      if (cantidad) {
        producto.cantidad = cantidad;
      }
      if (precio) {
        producto.precio = precio;
      }
      if (categoria) {
        producto.categoria = categoria;
      }
      if (imagenBuffer && contentType) {
        producto.imagen = { data: imagenBuffer, contentType };
      }
  
      await producto.save();
  
      const imagenCompleta =
        "data:" + producto.imagen.contentType + ";base64," + producto.imagen.data.toString("base64");
  
      res.json({ mensaje: "Producto editado correctamente", imagen: imagenCompleta });
    } catch (error) {
      console.error("Error al editar el producto", error);
      res.status(500).json({ mensaje: "Error al editar el producto" });
    }
  };
}
const productosC = new productosController();
module.exports = productosC;