import express from 'express'
import  connected  from './config/db.config.js'
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
connected()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})