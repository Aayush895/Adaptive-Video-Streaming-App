import express, { type Request, type Response } from 'express'
import videoRouter from './video.routes'
const v1Router = express.Router()

v1Router.get('/ping', (_req: Request, res: Response) => {
  return res.json({
    message: 'Pong!',
  })
})

v1Router.use('/videos', videoRouter)

export default v1Router
