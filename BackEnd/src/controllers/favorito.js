const model = require("../models/favorito");

const Add_Fav = async (req, res) => {
 
  try {
     const json = {
       usuario: req.body.usuario,
       producto: req.body.producto,
       id_prod: req.body.id_prod
     };
     // Validamos que no falten datos en el objeto json
     if (!json.usuario || !json.producto ) {
       return res
         .status(400)
         .json({ message: "Faltan datos necesarios para agregar su producto a favorito", status: 400 });
     }
 
     const data = new model(json);
     await data.save();
 
     res
       .status(200)
       .json({ message: "Producto Agregado a Favorito Exitosamente", status: 200 });
  } catch (error) {
     console.log("Error", error);
     res
       .status(500)
       .json({ message: "Error al intentar agregar producto a Favorito", status: 500 });
  }
 };

 const Fav_List = async (req, res) => {
  try {
    const userId = req.params.user_id; // Asegúrate de que 'user_id' sea el nombre correcto del parámetro
    const items = await model.find({ usuario: userId });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "No se encontraron productos favoritos para este usuario", status: 404 });
    }
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: "Error al intentar listar los Productos añadidos a favoritos", status: 500 });
  }
};


const Del_Fav = async(req, res) =>{
   //Se recibe el valor de id como parametro.
   const id_prod = req.query.id_prod;
   try {
      //Se realiza el llamado de findByIdAndDelete(id) transfiriendo id, para eliminar dicho record.
      const deleted = await model.findOneAndDelete({id_prod: id_prod});
      //Se valida la respuesta del mismo.
      if (!deleted) return res.status(404).send('Error: No se encontró el Producto a eliminar en Favoritos.');
         res.status(200).json({ message: "Favorito Eliminado Satisfactoriamente!", status: 200, deleted: deleted });
      } catch (err) {
         if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).send('Error: El ID del favorito proporcionado no es válida.');
         } else {
            return res.status(500).send('Error al intentar eliminar el favorito.');
         }
   }
 }


module.exports = { Add_Fav, Fav_List,Del_Fav };
