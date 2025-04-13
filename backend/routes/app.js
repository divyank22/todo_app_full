import express from 'express'
import  connected  from '../config/db.config.js'
import otproutes from "./otp.route.js"
import authroute from "./auth.route.js"
import corsMiddleware from '../middleware/cors.middleware.js'
import bodyparser from'body-parser';
const port = 3000
const app =express();
app.use(corsMiddleware)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use("/api/otp",otproutes)
app.use("/api/login",authroute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
connected()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})