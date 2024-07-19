const express = require('express')
const router = express.Router()

const Mascota = require('../models/mascotas')

router.get('/', async (req, res) => {
    try {
        const arrayMascotas = await Mascota.find()
        // console.log(arrayMascotas)
        res.render("mascotas",{
            titulo: "Listado de todas las mascotas",
            arrayMascotas: arrayMascotas
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/crear', async (request, response) => {
    response.render('crear',{
        titulo: "Crear mascota"
    })
})

router.post('/', async (request, response) => {
    const body = request.body
    try {
        await Mascota.create(body);
        response.redirect('mascotas')
    }
    catch(error){
        console.log(error)
    }
})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const mascotaDB = await Mascota.findOne({ _id: id })
        response.render('detalle',{
            titulo: "Modificar mascota",
            mascota: mascotaDB,
            error: false
        })
    }
    catch (error) {
        console.log(error)
        response.render('detalle',{
            titulo: "Modificar mascota",
            mensaje: `No se encontró el id '<b>${id}</b>'`,
            error: true
        })
    }
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({ _id: id })
        if (!mascotaDB) {
            response.json({
                estado: false,
                mensaje: `No se pudo eliminar el registro '<b>${id}</b>'`
            })
        } else {
            response.json({
                estado: true,
                mensaje: 'Registro eliminado'
            })
        }
    }
    catch (error) {
        console.log(error)
        response.json({
            estado: false,
            mensaje: `No se pudo eliminar el registro '<b>${id}</b>'`
        })
    }
})

router.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    // console.log(id)
    // console.log(body)

     try {
         const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
         console.log(mascotaDB)
         if (mascotaDB == null) {
             response.json({
                 estado: false,
                 mensaje: 'No se pudo actualizar'
             })
         } else {
             response.json({
                 estado: true,
                 mensaje: 'Registro actualizado'
             })
         }
     }
     catch (error) {
         console.log(error)
         response.json({
             estado: false,
             mensaje: 'No se pudo actualizar'
         })
     }
})

module.exports = router