import express from 'express'
import cors from 'cors'
import condominiumsRouter from './routes/condominiums'

const app = express()
const PORT = 3333

app.use(cors())
app.use(express.json())
app.use('/api', condominiumsRouter)

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`)
})
