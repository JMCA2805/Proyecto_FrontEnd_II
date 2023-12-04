const usuarios = require("../models/user");
const bcrypt = require("bcrypt")

class passwordController {
  change = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;
    
        const user = await usuarios.findById(id);
        if (!user) {
          return res
            .status(404)
            .json({ msg: "Usuario no encontrado", status: 404 });
        }
    
        const isMatch = await bcrypt.compare(oldPassword, user.contraseña);
        if (!isMatch) {
          return res.status(400).json({ msg: "Contraseña antigua incorrecta" });
        }

        const salt = await bcrypt.genSalt(10);
        user.contraseña = await bcrypt.hash(newPassword, salt);
    
    
        await user.save();
    
        res.status(200).json({ msg: "Contraseña actualizada correctamente" });
      } catch (error) {
        console.log("Error:", error);
        res
          .status(500)
          .json({
            msg: "Error al intentar actualizar la contraseña",
            status: 500,
          });
      }
  };
}

const newPaswword = new passwordController();

module.exports = newPaswword;
