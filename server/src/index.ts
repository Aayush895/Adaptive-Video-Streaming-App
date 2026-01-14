import express, { type Express, type Request, type Response } from 'express'

const app: Express = express()

app.get('/ping', (_req: Request, res: Response) => {
  return res.json({
    message: 'Pong',
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
