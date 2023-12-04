const Ofertas = require("../models/offers.js");

class offersController {
  getOffers = async (req, res) => {
    try {
      const ofertasobt = await Ofertas.find();
      let imagenCompleta;
      let data;
      let frts = [];

      for (let i = 0; i < ofertasobt.length; i++) {
        data = ofertasobt[i].icono.data;
        imagenCompleta =
          "data:" +
          ofertasobt[i].icono.contentType +
          ";base64," +
          data.toString("base64");

        frts[i] = {
          oferta: ofertasobt[i].oferta,
          descripcion: ofertasobt[i].descripcion,
          imagen: imagenCompleta,
        };
      }

      if (frts.length === 0) {
        res
          .status(500)
          .json({ mssg: "No se encontraron ofertas o descuentos" });
      } else {
        res.status(200).json(frts);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ Error: "Error al obtener ofertas o descuentos" });
    }
  };
  addoff = async (req, res) => {
    try {
      const { oferta, descripcion } = req.body;
      const imagenBuffer = req.file.buffer;
      const contentType = req.file.mimetype;

      const tituloOferta = await Ofertas.findOne({ oferta });

      if (tituloOferta) {
        res.status(400).send("Oferta o Descuento ya registrado");
      } else {
        const nuevaOferta = new Ofertas({
          oferta,
          descripcion,
          icono: { data: imagenBuffer, contentType },
        });
        await nuevaOferta.save();
        res.status(201).send("Oferta o Servicio agregado correctamente");
      }
    } catch (error) {
      console.error("Error al agregar Ofertas:", error);
      res.status(500).json({ Error: "Error al agregar Ofertas" });
    }
  };

  deloff = async (req, res) => {
    try {
      const oferta = req.body.oferta;
      const off = await Ofertas.findOne({ oferta: oferta });
      if (!off) {
        return res.status(404).json({ mensaje: "Oferta no encontrada" });
      }

      await Ofertas.deleteOne({ oferta: oferta });

      res.json({ mensaje: "Oferta o descuento eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar la oferta o descuento", error);
      res.status(500).json({ mensaje: "Error al eliminar la oferta  o descuento" });
    }
  };

  editoff = async (req, res) => {
    try {
      const { viejo, oferta, descripcion, icono } = req.body;
      console.log(viejo, oferta, descripcion, icono);

      const ofertas = await Ofertas.findOne({ oferta: viejo });

      if (!ofertas) {
        return res.status(404).json({ mensaje: "Oferta no encontrada" });
      }

      if (icono != undefined) {
        ofertas.oferta = oferta;
        ofertas.descripcion = descripcion;
        await ofertas.save();
        return res.status(200).json({
          mensaje: "Oferta o Descuento editado correctamente",
        });
      } else {
        const imagenBuffer = req.file.buffer;
        const contentType = req.file.mimetype;

        // Actualiza los datos del artículo
        ofertas.oferta = oferta;
        ofertas.descripcion = descripcion;
        ofertas.icono = { data: imagenBuffer, contentType };

        await ofertas.save();

        return res.status(200).json({
          mensaje: "Oferta o Descuento editado correctamente",
        });
      }
    } catch (error) {
      console.error("Error al editar la oferta o descuento:", error);
      res
        .status(500)
        .json({ mensaje: "Error al editar la oferta o descuento" });
    }
  };
}

const offersC = new offersController();

module.exports = offersC;
