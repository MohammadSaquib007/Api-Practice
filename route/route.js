const express = require('express')

const router = express.Router()

const userController = require('../controller/userController')

router.post('/createUser', userController.createUser)
router.get('/userDetails/:userId',userController.userDetails )
router.get('/userDetail',userController.userDetails )
router.post('/userlogin',userController.login)
router.put('/updateApi/:Id',userController.updateApi)
router.delete('/delete/:Id',userController.deleted)


module.exports = router
