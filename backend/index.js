const express = require("express")
const cors = require("cors")
const { PrismaClient } = require("./generated/prisma")

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

// ===============================
// OBTENER TODOS LOS VEHÍCULOS
// ===============================
app.get("/vehicles", async (req, res) => {

    try {

        const vehicles = await prisma.vehicle.findMany()

        res.json(vehicles)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// ===============================
// OBTENER CLIENTES
// ===============================
app.get("/clients", async (req, res) => {

    try {

        const clients = await prisma.client.findMany()

        res.json(clients)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// ===============================
// REGISTRAR VEHÍCULO
// ===============================
app.post("/vehicles", async (req, res) => {

    try {

        const { model, brand, year, priceDay } = req.body

        const vehicle = await prisma.vehicle.create({
            data: {
                model,
                brand,
                year: Number(year),
                priceDay: Number(priceDay),
                status: "AVAILABLE"
            }
        })

        res.json(vehicle)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// ===============================
// REGISTRAR ALQUILER
// ===============================
app.post("/rentals", async (req, res) => {

    try {

        const { vehicleId, clientId, startDate, endDate } = req.body

        const vehicle = await prisma.vehicle.findUnique({
            where: { id: Number(vehicleId) }
        })

        if (!vehicle) {
            return res.status(404).json({ error: "Vehículo no encontrado" })
        }

        if (vehicle.status === "RENTED") {
            return res.status(400).json({ error: "Vehículo no disponible" })
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        const diff = end - start
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

        if (days <= 0) {
            return res.status(400).json({ error: "Fechas inválidas" })
        }

        const total = days * vehicle.priceDay

        const rental = await prisma.rental.create({
            data: {
                startDate: start,
                endDate: end,
                totalPaid: total,
                vehicleId: Number(vehicleId),
                clientId: Number(clientId)
            }
        })

        await prisma.vehicle.update({
            where: { id: Number(vehicleId) },
            data: { status: "RENTED" }
        })

        res.json({
            message: "Alquiler registrado",
            total
        })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// ===============================
// DEVOLVER VEHÍCULO
// ===============================
app.put("/vehicles/:id/return", async (req, res) => {

    try {

        const id = Number(req.params.id)

        const vehicle = await prisma.vehicle.findUnique({
            where: { id }
        })

        if (!vehicle) {
            return res.status(404).json({ error: "Vehículo no encontrado" })
        }

        await prisma.vehicle.update({
            where: { id },
            data: { status: "AVAILABLE" }
        })

        res.json({
            message: "Vehículo devuelto correctamente"
        })

    } catch (error) {

        res.status(500).json({ error: error.message })

    }

})


// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(3000, () => {

    console.log("Servidor corriendo en http://localhost:3000")

})