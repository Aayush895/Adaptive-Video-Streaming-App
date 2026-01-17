import express, { Request, Response } from 'express'
import videoRouter from './video.routes'
const v1Router = express.Router()

v1Router.get('/ping', (_req: Request, res: Response) => {
  return res.json({
    message: 'Pong!',
  })
})

v1Router.post('/videos', videoRouter)

export default v1Router
