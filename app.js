import { config } from 'dotenv'
config()
import sequelize from './src/Utils/sequalize.js'
import express from 'express'
const app = express()
import serverRoutes from './src/Routes/server.routes.js'

app.use(express.json())

app.use('',serverRoutes)

app.get('/', (req, res) => {
  res.send('express test')
})


sequelize.sync({alter: true})

export default app