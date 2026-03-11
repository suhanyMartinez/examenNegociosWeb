import { useEffect, useState } from "react"
import axios from "axios"

function VehicleList(){

    const [vehicles,setVehicles] = useState([])

    const loadVehicles = async ()=>{

        const res = await axios.get("http://localhost:3000/vehicles")

        setVehicles(res.data)

    }

    useEffect(()=>{
        loadVehicles()
    },[])


    const returnVehicle = async (id)=>{

        try{

            await axios.put(`http://localhost:3000/vehicles/${id}/return`)

            alert("Vehículo devuelto correctamente")

            loadVehicles()

        }catch(error){

            alert("Error al devolver el vehículo")

        }

    }


    const rentAlert = (vehicle)=>{

        if(vehicle.status === "RENTED"){
            alert("❌ Este vehículo no está disponible")
            return
        }

        alert("Este vehículo está disponible. Usa el formulario de alquiler.")

    }


    return(

        <div>

            <h2>Catálogo de Vehículos</h2>

            <div className="grid">

                {vehicles.map(v=>(

                    <div className="card" key={v.id}>

                        <h3>{v.brand} {v.model}</h3>

                        <p>Año: {v.year}</p>

                        <p>Precio: ${v.priceDay} / día</p>

                        <p>
                            Estado: {v.status === "AVAILABLE"
                            ? "🟢 Disponible"
                            : "🔴 Alquilado"}
                        </p>

                        {v.status === "AVAILABLE" && (

                            <button
                            onClick={()=>rentAlert(v)}
                            >
                                Alquilar
                            </button>

                        )}

                        {v.status === "RENTED" && (

                            <button
                            style={{background:"#dc2626"}}
                            onClick={()=>returnVehicle(v.id)}
                            >
                                Devolver vehículo
                            </button>

                        )}

                    </div>

                ))}

            </div>

        </div>

    )

}

export default VehicleList