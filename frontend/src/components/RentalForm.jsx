import { useEffect, useState } from "react"
import axios from "axios"

function RentalForm({ onCreated }){

    const [vehicles,setVehicles] = useState([])
    const [clients,setClients] = useState([])

    const [data,setData] = useState({
        vehicleId:"",
        clientId:"",
        startDate:"",
        endDate:""
    })

    const [total,setTotal] = useState(0)

    useEffect(()=>{

        const loadData = async()=>{

            const v = await axios.get("http://localhost:3000/vehicles")
            const c = await axios.get("http://localhost:3000/clients")

            setVehicles(v.data)
            setClients(c.data)

        }

        loadData()

    },[])


    const calculateTotal = () => {

        const vehicle = vehicles.find(v => v.id === Number(data.vehicleId))

        if(!vehicle || !data.startDate || !data.endDate){
            setTotal(0)
            return
        }

        const start = new Date(data.startDate)
        const end = new Date(data.endDate)

        const diff = end - start

        const days = Math.ceil(diff / (1000*60*60*24))

        if(days > 0){
            setTotal(days * vehicle.priceDay)
        }else{
            setTotal(0)
        }

    }


    useEffect(()=>{
        calculateTotal()
    },[data])


    const handleSubmit = async(e)=>{

        e.preventDefault()

        await axios.post("http://localhost:3000/rentals",data)

        alert("Alquiler registrado")

        setTotal(0)

        onCreated()

    }


    return(

        <form onSubmit={handleSubmit}>

            <h3>Alquilar Vehículo</h3>

            <select
            required
            onChange={(e)=>setData({...data,vehicleId:Number(e.target.value)})}
            >

                <option value="">Seleccionar Vehículo</option>

                {vehicles.map(v=>(
                    <option key={v.id} value={v.id}>
                        {v.brand} {v.model} - ${v.priceDay}/día
                    </option>
                ))}

            </select>


            <select
            required
            onChange={(e)=>setData({...data,clientId:Number(e.target.value)})}
            >

                <option value="">Seleccionar Cliente</option>

                {clients.map(c=>(
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}

            </select>


            <input
            type="date"
            required
            onChange={(e)=>setData({...data,startDate:e.target.value})}
            />

            <input
            type="date"
            required
            onChange={(e)=>setData({...data,endDate:e.target.value})}
            />

            {total > 0 && (

                <div style={{
                    marginTop:"15px",
                    padding:"12px",
                    background:"#d1fae5",
                    borderRadius:"8px",
                    color:"#065f46",
                    fontWeight:"bold",
                    fontSize:"16px"
                }}>

                    💰 Total estimado: ${total}

                </div>

            )}

            <button style={{marginTop:"10px"}}>
                Alquilar
            </button>

        </form>

    )

}

export default RentalForm