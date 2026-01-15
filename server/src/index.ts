import express, { type Express } from 'express'
import { port } from './config/server.config'
import apiRouter from './routes'

const app: Express = express()

app.use('/api', apiRouter)

app.listen(port, () => {
  console.log('Server is running on port 3000')
})
