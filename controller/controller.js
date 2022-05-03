const StoreDB = require('../model/storeSchema')
const VehicleDB = require('../model/vehicleSchema')




const getStoreRecord = async (req, res)=>{
    try {
        const allData = await StoreDB.find().lean()
        res.status(200).json({
            error: false,
            message: "Data Recieved",
            data: allData
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true,
            message: "Something went wrong, Data not recieved...!",
            data: null
        })
    }
}

const saveStoreRecord = async (req, res)=>{
    const { name, address, hrs_of_operation, vehicle_records } = req.body
    try {
        const saveRecord = await new StoreDB({
            name, address, hrs_of_operation, vehicle_records
        }).save()

        res.status(200).json({
            error: false,
            message: "Data Saved successfully...!",
            data: null
        })
    } catch (error) {
        res.status(200).json({
            error: true,
            message: "Record Not Saved...!",
            data: null
        })
    }
}

const getVehicleRecord = async (req, res)=>{
    try {
        const allData = await VehicleDB.find().lean()
        res.status(200).json({
            error: false,
            message: "Data Recieved",
            data: allData
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true,
            message: "Something went wrong, Data not recieved...!",
            data: null
        })
    }
}

const saveVehicleRecord = async (req, res)=>{
    const { vId, name, price, imgSrc } = req.body
    try { 
        const saveRecord = await new VehicleDB({
            vId, name, price, imgSrc
        }).save()
        res.status(200).json({
            error: false,
            message: "Data Saved successfully...!",
            data: null
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true,
            message: "Record Not Saved...!",
            data: null
        })
    }
}

const getCount = async (req, res)=>{
    const { id, vid } = req.params

    try {
        const count = await StoreDB.aggregate([
            // Un-wind the array's to access filtering 
            { "$unwind": "$vehicle_records" },
            { "$unwind": "$vehicle_records" },
            { "$unwind": "$vehicle_records.vDetails" },

            // Match to filter
            { "$match": { 
                "vehicle_records.vId" : `${vid}`,
                "vehicle_records.vDetails.status": "available" } },
            
            // Group results to obtain the matched count per key
            { "$group": {
                "_id": {
                    "_id": "$_id",
                    "store" : "$address",
                    "vId" : "$vehicle_records.vId",
                    "key": "$vehicle_records.vDetails.status",
                },
                "count": { "$sum": 1 }
            }}
        ]) 

        // console.log(count)

        const filterredAvailRecord = await count.filter((ele)=>{
            const { _id } = ele._id
            // console.log(ele)
            return id === _id.toString()
        })

        console.log(filterredAvailRecord)
        
        res.status(200).json({
            error: false,
            message: "Get Count...!",
            data: filterredAvailRecord
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true,
            message: "Not Get Count...!",
            data: error
        })
    }
}

module.exports = {
    getCount,
    getStoreRecord, 
    saveStoreRecord, 
    getVehicleRecord,
    saveVehicleRecord,
}