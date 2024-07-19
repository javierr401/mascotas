const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("index", {titulo: "Mi titulo dinámico"})
})

router.get('/servicios', (req, res) => {
    res.render("servicios", {titulo: "Mi titulo dinámico - servicios"})
})

module.exports = router