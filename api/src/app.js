const express = require("express")
const attachDbConnection = require("./middleware/dbMiddleWare")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(attachDbConnection)


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})