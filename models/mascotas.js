const mongoose = require('mongoose')
const schema = mongoose.Schema

const mascotasSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String
})

const Mascota = mongoose.model('Mascota', mascotasSchema)

module.exports = Mascota
