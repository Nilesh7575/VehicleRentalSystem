const express = require('express')
const router = express.Router()
const { getAvail, 
        getStoreRecord, 
        saveStoreRecord, 
        getVehicleRecord,
        saveVehicleRecord,
        getCount, 
    } = require('../controller/controller')


router.get('/getcount/:id/:vid', getCount)

router.get('/get-store-record', getStoreRecord)

router.post('/save-store-record', saveStoreRecord)

router.get('/get-vehicle-record', getVehicleRecord)

router.post('/save-vehicle-record', saveVehicleRecord)




module.exports = router