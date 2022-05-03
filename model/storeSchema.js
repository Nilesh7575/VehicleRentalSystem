const mongoose = require('mongoose')






const StoreData = new mongoose.Schema({
    name : { type: String, required: true},
    address : { type: String, required: true},
    hrs_of_operation: { type: String, required: true},
    vehicle_records : []
})

module.exports = mongoose.model("StoreRecords", StoreData)
