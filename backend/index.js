const express = require("express");
const mainRouter = require("./routes");
const app = express()
const cors = require('cors')
const port = 3000;
app.use(cors())
app.use(express.json())
app.use('/api/v1',mainRouter)
app.listen(port,()=>{
    console.log(`[ ready ] http://localhost:${port}/api/v1`)
})