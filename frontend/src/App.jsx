import { useState } from "react"
import "./App.css"

import VehicleForm from "./components/VehicleForm"
import ClientForm from "./components/ClientForm"
import RentalForm from "./components/RentalForm"
import VehicleList from "./components/VehicleList"

function App(){

    const [reload,setReload] = useState(false)

    const refresh = ()=>{
        setReload(!reload)
    }

    return(

        <div className="container">

            <h1>Sistema de Alquiler de Vehículos</h1>

            <div className="forms">

                <VehicleForm onCreated={refresh}/>
                <ClientForm onCreated={refresh}/>
                <RentalForm onCreated={refresh}/>

            </div>

            <VehicleList reload={reload}/>

        </div>

    )
}

export default App