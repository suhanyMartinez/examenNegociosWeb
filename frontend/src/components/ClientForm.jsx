import { useState } from "react"
import axios from "axios"

function ClientForm({ onCreated }){

    const [client,setClient] = useState({
        name:"",
        phone:"",
        email:"",
        license:""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post("http://localhost:3000/clients",client)

        alert("Cliente creado")

        onCreated()
    }

    return(

        <form onSubmit={handleSubmit}>

            <h3>Registrar Cliente</h3>

            <input
            placeholder="Nombre"
            onChange={(e)=>setClient({...client,name:e.target.value})}
            />

            <input
            placeholder="Teléfono"
            onChange={(e)=>setClient({...client,phone:e.target.value})}
            />

            <input
            placeholder="Correo"
            onChange={(e)=>setClient({...client,email:e.target.value})}
            />

            <input
            placeholder="Licencia"
            onChange={(e)=>setClient({...client,license:e.target.value})}
            />

            <button>Crear Cliente</button>

        </form>

    )
}

export default ClientForm