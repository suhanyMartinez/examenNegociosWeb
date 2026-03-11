import { useState } from "react"
import axios from "axios"

function VehicleForm({ onCreated }) {

    const [form, setForm] = useState({
        model: "",
        brand: "",
        year: "",
        priceDay: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:3000/vehicles", form)

        alert("Vehículo registrado")

        onCreated()
    }

    return (

        <form onSubmit={handleSubmit}>

            <h3>Registrar Vehículo</h3>

            <input
                placeholder="Modelo"
                onChange={(e) => setForm({ ...form, model: e.target.value })}
            />

            <input
                placeholder="Marca"
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />

            <input
                placeholder="Año"
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            />

            <input
                placeholder="Precio por día"
                onChange={(e) => setForm({ ...form, priceDay: Number(e.target.value) })}
            />

            <button>Registrar</button>

        </form>

    )
}

export default VehicleForm