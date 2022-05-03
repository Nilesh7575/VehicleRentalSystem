import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import axios from 'axios'




function Dashboard() {
  
  const [StoreData, setStoreData] = useState()
  const [VehicleData, setVehicleData] = useState()
  const [StoreVehicleRecord, setStoreVehicleRecord] = useState()
  const [VehicleVId, setVehicleVId] = useState('')
  const [Count, setCount] = useState()

useEffect(() => {
  getStoreRecord()
  getVehicleRecord()
}, [])

useEffect(() => {
  if(Count)
  updateCount()
}, [Count])

  const getStoreRecord = async ()=>{
    const resp = await axios.get('http://localhost:2000/get-store-record')
    setStoreData(resp.data.data)
  }

  const getVehicleRecord = async ()=>{
    const resp = await axios.get('http://localhost:2000/get-vehicle-record')
    // console.log("Hii", resp.data.data)
    setVehicleData(resp.data.data)
  }

  const handleChange = async (e, VehiclevId)=>{
    const id = e.target.value
    const resp = await axios.get(`/getcount/${id}/${VehiclevId}`)
    const vCount = await resp.data.data.map((ele)=>{
      return ele
    })
    setStoreVehicleRecord(vCount) 
    setVehicleVId(VehiclevId)
    
    
  }

  
  
  const updateCount = async ()=>{
    const data = await StoreVehicleRecord.map((ele)=>{
      console.log(ele)
      return ele
    })
    setCount(data)
  }

  
  return (
    <div className="container cardDiv" style={{ margin: '30px auto'}}>
      { VehicleData && VehicleData.map((ele, index)=>{
        return (
          <div key={index} style={{ marginBottom: '1rem'}}>
            <Card style={{ width: '18rem'}} className="cards">
            <Card.Body>
            <Card.Img variant="top" src={ele.imgSrc} height="200px" />
            <Card.Title>{ele.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">₹{ele.price}</Card.Subtitle>
            {  StoreVehicleRecord ? (
              StoreVehicleRecord.map((val, index)=>{
                // console.log(val._id.vId, VehicleVId)
                return (val._id.vId===VehicleVId) && <Card.Text key={index}>{val.count}Left</Card.Text>
              })
            ) : (
              <Card.Text>0 Left</Card.Text>
            )
            
            
            }
            
            <Form.Select size="sm"  
              onChange={(e)=>handleChange(e, ele.vId)}
              >
              <option >Select store</option>
              { StoreData && StoreData.map((storeDataval, index)=>{
                return <option value={storeDataval._id} key={index}>{storeDataval.address}</option>
              })}
            </Form.Select>
            <Button variant="danger" className='mt-2' >Book Now</Button>
            </Card.Body>
          </Card>
          </div>
        )
        })
      }
    </div>
  )
}

export default Dashboard