const express=require('express')
const router= express.Router()
const control=require('../controller/controller.user')


router.get('/',control.dameUsers)
router.get('/login',control.login)
router.get('/contacts/:username',control.dameContacto)


router.get('/:username',control.dameUserPorName)

router.post('/',control.crearUser)

router.patch('/:username',control.editarContacto)

//Contactos

//1.Editar un contacto de la lista
router.patch('/edit_contact/:username',control.editarUser)

router.patch('/add_contact/:username',control.agregarContacto)




module.exports=router