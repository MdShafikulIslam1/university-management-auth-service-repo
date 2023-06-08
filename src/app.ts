import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//middleware
app.use(cors())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//test api
app.get('/', (req: Request, res: any) => {
  res.send('working properly')
})

export default app
