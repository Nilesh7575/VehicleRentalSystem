const mongoose = require('mongoose')






const VehicleData = new mongoose.Schema({
    vId : { type: String, required: true},
    name : { type: String, required: true},
    price: { type: String, required: true},
    imgSrc: { type: String, required: true},
})

module.exports = mongoose.model("VehicleRecords", VehicleData)