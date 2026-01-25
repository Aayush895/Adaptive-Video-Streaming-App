import express, { type Express } from 'express'
import cors from 'cors'
import path from 'path'
import { port } from './config/server.config'
import apiRouter from './routes'

const app: Express = express()

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use('/api', apiRouter)

console.log(path.join(__dirname, '../output'))

app.use('/output', express.static(path.join(__dirname, '../output')))

app.listen(port, () => {
  console.log('Server is running on port 3000')
})
