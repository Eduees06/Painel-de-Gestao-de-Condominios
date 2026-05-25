import { Router } from 'express'
import { fetchCondominiums } from '../services/datausa'

const router = Router()

router.get('/condominiums', async (_req, res) => {
  try {
    const condominiums = await fetchCondominiums()
    res.json(condominiums)
  } catch {
    res.status(502).json({ error: 'Falha ao consultar API externa' })
  }
})

export default router
