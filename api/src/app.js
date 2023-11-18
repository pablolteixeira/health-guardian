const express = require("express")
const cors = require("cors")
const attachDbConnection = require("./middleware/dbMiddleWare")

const app = express()
const port = process.env.PORT || 3000

const validatorRoutes = require("./routes/validatorRoutes")

app.use(cors())
app.use(express.json())
app.use(attachDbConnection)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use("/api/validators", validatorRoutes)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})