import express, { type Express } from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import { port } from './config/server.config'
import apiRouter from './routes'
import { DB_NAME, DB_URI } from './config/server.config'

const app: Express = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use('/api', apiRouter)

console.log(path.join(__dirname, '../output'))

app.use('/output', express.static(path.join(__dirname, '../output')))


async function startServer() {
  try {
    const mongodbconnectionInstance = await mongoose.connect(
      `${DB_URI}/${DB_NAME}`,
    )

    console.log(
      `MongoDB connected! DB Host: ${mongodbconnectionInstance.connection.host}`,
    )
    app.listen(port, () => {
      console.log('Server is running on port 3000')
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}
startServer()
